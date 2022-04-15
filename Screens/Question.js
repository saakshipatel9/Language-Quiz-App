import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal,
  Alert,
} from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import wordData from "./../data/words.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "./../firebase";

export function Question({ route, navigation }) {
  const { numberOfQuestions } = route.params;
  const { level } = route.params;
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionList, setQuestionList] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const createTwoButtonAlert = () =>
    Alert.alert("Do you want to submit the quiz?", "", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => checkAnswer() },
    ]);

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

    return {
      words: wordList,
      question: q,
      answer: false,
      correct: questionIndex,
    };

    // setQuestion({
    //   words: wordList,
    //   question: q,
    //   correct: questionIndex,
    // });
    // setShowAnswer(false);
  };

  const makeTest = async () => {
    let ql = [];
    for (var i = 0; i < numberOfQuestions; i += 1) {
      ql.push({ ...(await makeQuestion()), questionIndex: i });
    }
    console.log(ql);
    setQuestionList(ql);

    console.log(ql[0].question);
  };

  useEffect(async () => {
    makeTest();
    // makeQuestion();
    // console.log(wordData);
  }, []);

  useEffect(() => {}, [count]);

  const handleAnswer = (answerIndex) => {
    let ql = questionList;
    ql[currentQuestion].answer = answerIndex;
    console.log({ currentQuestion, answerIndex });
    next();

    // setQuestionList(q1);

    // if (answerIndex == questionList[currentQuestion]?.correct)
    //   setScore(score + 1);
    // setShowAnswer(true);
    // console.log({ ql });
  };

  const countAnswer = () => {
    let count = 0;
    for (let x in questionList) {
      if (questionList[x].answer != false) count += 1;
    }
    return count;
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

  const jumpQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const next = () => {
    if (currentQuestion < numberOfQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setCurrentQuestion(0);
  };

  const prev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
    else setCurrentQuestion(numberOfQuestions - 1);
  };

  const submit = () => {
    console.log(questionList);
    createTwoButtonAlert();
  };

  const checkAnswer = () => {
    navigation.popToTop();

    questionDate = new Date().toDateString();
    //save data to cloud
    db.collection("Results")
      .doc()
      .set({
        time: questionDate,
        userId: auth.currentUser.uid,
        submission: questionList,
      })
      .then(() => console.log("success"))
      .catch((err) => console.log(err));

    navigation.navigate("result", {
      submission: questionList,
      date: questionDate,
    });
  };

  return (
    <>
      {!questionList && (
        <View style={styles.main}>
          <Text style={{ marginTop: 350 }}>loading</Text>
          <Image
            resizeMode="cover"
            source={require("../assets/question-bg-img.png")}
            style={styles.background}
          />
        </View>
      )}
      {questionList && (
        <View style={styles.main}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Choose a question</Text>
                  <View style={styles.modalButtonDiv}>
                    {questionList.map((item, index) => {
                      return (
                        <Pressable
                          style={{
                            ...styles.modalButton,
                            backgroundColor:
                              item.answer !== false ? "#FFABAB" : "gray",
                          }}
                          key={index}
                          onPress={() => {
                            jumpQuestion(index);
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.modalButtonText}>
                            {item.questionIndex + 1}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {/* <Button
              title={"Save"}
              onPress={() => {
                if (question) {
                  handleSave(question.words[question.correct]);
                }
              }}
            /> */}

            <View>
              <Text>{new Date().getTime()}</Text>
            </View>

            {/* <Text>
              Answered: {countAnswer()}/{numberOfQuestions}
            </Text> */}

            <TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
              <View>
                <MaterialIcons name="info-outline" color={"black"} size={30} />
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
              {currentQuestion + 1}
              <Text style={{ fontSize: 30 }}>/{numberOfQuestions}</Text>
            </Text>
            <Text style={styles.questionStatement}>
              {questionList[currentQuestion]?.question.slice(0, 180)}
            </Text>
          </View>

          <View style={styles.optionDiv}>
            {questionList[currentQuestion]?.words.map((word, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    ...styles.button,
                    backgroundColor:
                      questionList[currentQuestion].answer === false
                        ? "white"
                        : questionList[currentQuestion].answer == index
                        ? "#FFABAB"
                        : "white",
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "120%",
            }}
          >
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                prev();
              }}
            >
              <Text style={styles.nextButtonText}>Prev</Text>
            </Pressable>
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                submit();
              }}
            >
              <Text style={styles.nextButtonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                next();
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "ropasans-regular",
    fontSize: 25,
  },
  modalButtonDiv: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 1,
  },
  modalButton: {
    height: 50,
    width: 50,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "grey",
  },
  modalButtonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ropasans-regular",
    fontSize: 25,
  },
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
    backgroundColor: "white",
    color: "white",
    alignSelf: "flex-end",
    // borderWidth: 3,
    // borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    bottom: -200,
    borderRadius: 100,
  },
  nextButtonText: {
    top: -20,
    color: "black",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
