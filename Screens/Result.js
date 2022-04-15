import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useEffect } from "react";

export function Result({ route, navigation }) {
  const { submission } = route.params;
  const { date } = route.params;

  const findCorrect = (questionList) => {
    let count = 0;
    for (let q = 0; q < questionList.length; q += 1) {
      if (
        questionList[q].answer !== false &&
        questionList[q].answer === questionList[q].correct
      ) {
        count++;
      }
    }
    return count;
  };

  const findIncorrect = (questionList) => {
    let count = 0;
    for (let q = 0; q < questionList.length; q += 1) {
      if (
        questionList[q].answer !== false &&
        questionList[q].answer !== questionList[q].correct
      ) {
        count++;
      }
    }
    return count;
  };

  const findSkipped = (questionList) => {
    let count = 0;
    for (let q = 0; q < questionList.length; q += 1) {
      if (questionList[q].answer === false) count += 1;
    }
    return count;
  };

  useEffect(() => {
    console.log(submission);
    console.log("result screen");
  }, []);
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Result</Text>
      <Text>{date}</Text>
      <View style={styles.stat}>
        <Text style={styles.statText}>
          Correct {"\n"}{" "}
          <Text style={styles.statTextNumber}>{findCorrect(submission)}</Text>
        </Text>
        <Text style={styles.statText}>
          Incorrect {"\n"}{" "}
          <Text style={styles.statTextNumber}>{findIncorrect(submission)}</Text>
        </Text>
        <Text style={styles.statText}>
          Skipped {"\n"}{" "}
          <Text style={styles.statTextNumber}>{findSkipped(submission)}</Text>
        </Text>
      </View>

      <ScrollView style={styles.detailsDiv}>
        {submission.map((item, index) => {
          return (
            <View style={styles.details} key={index}>
              <Text style={styles.detailsQuestion}>
                {item.questionIndex + 1}. {item.question}
              </Text>
              <Text>Answer: {item.words[item.correct]}</Text>
              <Text>
                Your Answer:{" "}
                {item.answer !== false ? item.words[item.answer] : "skipped"}
              </Text>
              <Text>
                Result:{" "}
                {item.answer !== false ? (
                  item.words[item.answer] === item.words[item.correct] ? (
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Correct
                    </Text>
                  ) : (
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      Incorrect
                    </Text>
                  )
                ) : (
                  <Text style={{ color: "grey", fontWeight: "bold" }}>
                    Skipped
                  </Text>
                )}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Image
        resizeMode="cover"
        source={require("../assets/question-bg-img.png")}
        style={styles.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0)",
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -1,
  },
  heading: {
    color: "black",
    fontFamily: "ropasans-regular",
    marginTop: 20,
    fontSize: 30,
  },
  stat: {
    marginTop: 20,

    // backgroundColor: "yellow",
    alignSelf: "center",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    maxHeight: 120,
  },
  statText: {
    // backgroundColor: "green",
    fontFamily: "ropasans-regular",
    fontSize: 25,
    padding: 5,
    textAlign: "center",
    height: 100,
  },
  statTextNumber: {
    fontSize: 50,
  },
  detailsDiv: {
    // backgroundColor: "red",
    flex: 1,
    padding: 10,
    paddingBottom: 30,
    marginBottom: 10,
  },
  details: {
    margin: 5,
    padding: 5,
  },
  detailsQuestion: {
    color: "black",
    fontFamily: "ropasans-regular",
    marginTop: 15,
    fontSize: 20,
  },
});
