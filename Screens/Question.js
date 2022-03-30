import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "./../firebase";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export function Question({ navigation }) {
  const [question, setQuestion] = useState(null);

  async function fetchWord() {
    let wordCount = await db
      .collection("Words")
      .get()
      .then(function (querySnapshot) {
        return querySnapshot.size;
      });
    let randomId = Math.floor(Math.random() * wordCount) + 1;

    return await db
      .collection("Words")
      .where("id", "==", randomId)
      .get()
      .then(async (res) => {
        return res.docs[0].data().word;
      });
  }

  const fourWords = async () => {
    let wordList = [
      await fetchWord(),
      await fetchWord(),
      await fetchWord(),
      await fetchWord(),
    ];
    // console.log(wordList);
    return wordList;
  };

  const makeQuestion = async () => {
    let questionIndex = Math.floor(Math.random() * 4);
    const wordList = await fourWords();
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

    // return {
    //   words: wordList,
    //   question: question,
    //   correct: questionIndex,
    // };
  };

  useEffect(async () => {
    makeQuestion();
  }, []);

  return (
    <>
      {question && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Question Screen</Text>
        </View>
      )}
      {!question && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading</Text>
        </View>
      )}
    </>
  );
}
