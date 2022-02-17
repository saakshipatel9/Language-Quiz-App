import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

export function Dictionary({ navigation }) {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setWord(false);
    setResult(false);
    console.log(word);

    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        // console.log(res.data[0]);

        setResult(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Text style={styles.heading}>dictionary</Text>
      <View style={styles.inputDiv}>
        <TextInput
          value={word}
          onChangeText={(text) => setWord(text)}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          onKeyPress={(ev) => {
            console.log(ev);
            // if (ev.key === "Enter") {
            //   console.log("enter pressed");
            //   ev.preventDefault();
            //   handleSearch();
            // }
          }}
          placeholder="word"
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>
            <MaterialIcons name="search" color={"white"} size={25} />
          </Text>
        </Pressable>
      </View>
      <View style={styles.contentDiv}>
        {result && !loading && (
          <View>
            <Text style={styles.resultHeading}>{result?.word}</Text>
            <Text style={styles.resultSubheading}>
              {result?.meanings[0].partOfSpeech} | {result?.phonetics[0].text}
            </Text>
            <Text style={styles.resultMeaning}>
              {result?.meanings[0].definitions[0].definition}
            </Text>
          </View>
        )}
        {!result && loading && <Text style={{ marginTop: 100 }}>Loading</Text>}
      </View>
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
  inputDiv: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    // borderWidth: 1,
    // borderColor: "black",
    padding: 0,
  },
  heading: {
    paddingHorizontal: 35,
    alignSelf: "flex-start",
    fontSize: 40,
    fontFamily: "ropasans-regular",
  },
  input: {
    margin: 5,
    height: 35,
    width: 300,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderColor: "black",
    borderWidth: 3,
    fontSize: 25,
    fontFamily: "ropasans-regular",
  },
  button: {
    margin: 5,
    padding: 6,
    width: 35,
    height: 35,
    backgroundColor: "black",
    color: "white",
  },

  buttonText: {
    color: "white",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
  contentDiv: {
    flex: 1,
    padding: 70,
    textAlign: "center",
    marginTop: 15,
  },
  resultHeading: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "ropasans-regular",
  },
  resultSubheading: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "ropasans-regular",
  },
  resultMeaning: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "ropasans-regular",
  },
});
