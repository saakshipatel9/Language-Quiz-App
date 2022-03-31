import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";

export function Quiz({ navigation }) {
  const text = [
    "5 Questions",
    "10 Questions",
    "15 Questions",
    "20 Questions",
    "100 Questions",
  ];

  const number = [5, 10, 15, 20, 100];

  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Text>Select Number of Questions</Text>
      <SelectDropdown
        defaultButtonText="Select number of questions"
        statusBarTranslucent={true}
        dropdownBackgroundColor={"red"}
        defaultValue={"5 Questions"}
        data={text}
        buttonStyle={{
          width: "50%",
          height: 50,
          backgroundColor: "rgba(0,0,0,0)",
          paddingHorizontal: 0,
          borderWidth: 3,
          margin: 10,
          borderColor: "#444",
        }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          setNumberOfQuestions(number[index]);
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("question", {
            numberOfQuestions: numberOfQuestions,
          });
        }}
      >
        <Text style={styles.start}>Start Quiz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
    paddingTop: 50,
  },
  background: {
    position: "absolute",
    opacity: 1,
    flex: -1,
  },
  start: {
    paddingHorizontal: 35,
    fontSize: 40,
    fontFamily: "ropasans-regular",
    textAlign: "left",
  },
});
