import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "./../firebase";
import { useEffect } from "react";

export function Question({ navigation }) {
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
      .where("id", "==", wordCount)
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
    console.log(wordList);
  };

  useEffect(() => {
    fourWords();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Question Screen</Text>
    </View>
  );
}
