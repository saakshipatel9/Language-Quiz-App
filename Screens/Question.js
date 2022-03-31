import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { db } from "./../firebase";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import wordData from "./../data/words.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Question({ route, navigation }) {
  const { numberOfQuestions } = route.params;
  const { level } = route.params;
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  async function fetchWord() {
    // let wordCount = await db
    //   .collection("Words")
    //   .get()
    //   .then(function (querySnapshot) {
    //     return querySnapshot.size;
    //   });

    let wordCount;
    if (level == 1) {
      wordCount = 0;
    }
    if (level == 2) {
      wordCount = 100;
    }
    if (level == 3) {
      wordCount = 200;
    }

    let randomId = Math.floor(Math.random() * 100) + 1 + wordCount;

    return wordData[randomId].word;

    //comment when firebase has reached quota and use static data
    // return await db
    //   .collection("Words")
    //   .where("id", "==", randomId)
    //   .get()
    //   .then(async (res) => {
    //     return res.docs[0].data().word;
    //   });
  }

  const fourWords = async () => {
    let wordList = [
      await fetchWord(),
      await fetchWord(),
      await fetchWord(),
      await fetchWord(),
      await fetchWord(),
    ];
    // console.log(wordList);
    return wordList;
  };

  const makeQuestion = async () => {
    setQuestion(null);
    const wordList = await fourWords();
    let questionIndex = Math.floor(Math.random() * wordList.length);
    const q = await axios
      .get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordList[questionIndex]}`
      )
      .then((res) => {
        return res.data[0].meanings[0].definitions[0].definition;
      })
      .catch((err) => {
        console.log(err);
      });

    setQuestion({
      words: wordList,
      question: q,
      correct: questionIndex,
    });
    setShowAnswer(false);
  };

  useEffect(async () => {
    makeQuestion();
    // console.log(wordData);
  }, []);

  useEffect(() => {}, [count]);

  const handleAnswer = (answerIndex) => {
    if (answerIndex == question.correct) setScore(score + 1);
    setShowAnswer(true);
  };

  const handleSave = (word) => {
    if (!showAnswer) {
      alert("Answer the current question");
    } else {
      alert("saved " + word);
    }
  };

  const handleNext = () => {
    if (showAnswer) {
      setCount(count + 1);
      if (count >= numberOfQuestions) {
        alert(`Quiz Ended \n Score : ${score}/${1 * numberOfQuestions}`);
        navigation.goBack();
      } else {
        makeQuestion();
      }
    } else {
      alert("Answer the current question");
    }
  };

  return (
    <>
      {!question && (
        <View style={styles.main}>
          <Text style={{ marginTop: 350 }}>loading</Text>
          <Image
            resizeMode="cover"
            source={require("../assets/question-bg-img.png")}
            style={styles.background}
          />
        </View>
      )}
      {question && (
        <View style={styles.main}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            {/* <Button
              title={"Save"}
              onPress={() => {
                if (question) {
                  handleSave(question.words[question.correct]);
                }
              }}
            /> */}
            <TouchableHighlight
              onPress={() => {
                if (question) {
                  handleSave(question.words[question.correct]);
                }
              }}
            >
              <View>
                <MaterialIcons name="save" color={"black"} size={30} />
              </View>
            </TouchableHighlight>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Score: {score}
            </Text>
            <TouchableHighlight
              onPress={() => {
                if (question) {
                  setShowAnswer(true);
                }
              }}
            >
              <View>
                <MaterialIcons
                  name="lightbulb-outline"
                  color={"black"}
                  size={30}
                />
              </View>
            </TouchableHighlight>
            {/* <Button
              onPress={() => {
                if (question) {
                  setShowAnswer(true);
                }
              }}
              title={"Hint"}
            /> */}
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: 0,
              justifyContent: "flex-start",
              padding: 10,
              paddingHorizontal: 30,
            }}
          >
            <Text style={styles.questionNumber}>
              {count}
              <Text style={{ fontSize: 30 }}>/{numberOfQuestions}</Text>
            </Text>
            <Text style={styles.questionStatement}>{question.question}</Text>
          </View>

          <View style={styles.optionDiv}>
            {question.words.map((word, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    ...styles.button,
                    backgroundColor: showAnswer
                      ? question.correct == index
                        ? "#4fc978"
                        : "#ff6262"
                      : "transparent",
                  }}
                  onPress={() => {
                    handleAnswer(index);
                  }}
                >
                  <Text style={styles.buttonText}>{word}</Text>
                </Pressable>
              );
            })}
          </View>
          <View>
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                handleNext();
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>

          <Image
            resizeMode="cover"
            source={require("../assets/question-bg-img.png")}
            style={styles.background}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0)",
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -1,
  },
  questionDiv: {
    // flex: 1,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-start",
  },
  questionNumber: {
    fontFamily: "ropasans-regular",
    fontSize: 70,
    margin: 0,
  },
  questionStatement: {
    padding: 15,
    textAlign: "left",
    fontFamily: "ropasans-regular",
    fontSize: 25,
    minHeight: 200,
  },

  optionDiv: {
    top: 0,
  },

  button: {
    margin: 5,
    width: 300,
    height: 50,
    backgroundColor: "rgba(0,0,0,0)",
    color: "white",
    alignSelf: "flex-end",
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "gray",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
  nextButton: {
    margin: 5,
    width: 150,
    height: 150,
    backgroundColor: "black",
    color: "white",
    alignSelf: "flex-end",
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    bottom: -50,
    borderRadius: 100,
  },
  nextButtonText: {
    top: -20,
    color: "white",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
