import { Button, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { db } from "./../firebase";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import wordData from "./../data/words.json";

export function Question({ navigation }) {
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  async function fetchWord() {
    // let wordCount = await db
    //   .collection("Words")
    //   .get()
    //   .then(function (querySnapshot) {
    //     return querySnapshot.size;
    //   });

    let wordCount = 300;
    let randomId = Math.floor(Math.random() * wordCount) + 1;

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

  const handleAnswer = (answerIndex) => {
    setShowAnswer(true);
  };

  return (
    <>
      {!question && (
        <View style={styles.main}>
          <Text>loading</Text>
          <Image
            resizeMode="cover"
            source={require("../assets/question-bg-img.png")}
            style={styles.background}
          />
        </View>
      )}
      {question && (
        <View style={styles.main}>
          <View styles={styles.questionDiv}>
            <Text style={styles.questionStatement}>{question.question}</Text>
          </View>

          <View style={styles.optionDiv}>
            {question.words.map((word, index) => {
              return (
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: showAnswer
                      ? question.correct == index
                        ? "#4fc978"
                        : "#ff6262"
                      : "transparent",
                  }}
                  onPress={() => {
                    handleAnswer(0);
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
                if (showAnswer) {
                  makeQuestion();
                } else {
                  alert("Answer the current question");
                }
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  questionNumber: {
    fontFamily: "ropasans-regular",
    fontSize: 70,
    margin: 5,
  },
  questionStatement: {
    margin: 10,
    marginTop: 60,
    padding: 15,
    textAlign: "center",
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
