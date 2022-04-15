import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { auth, db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({ route, navigation }) {
  const handleSignout = () => auth.signOut();

  const [user, setUser] = useState(null);
  const [result, setResult] = useState([]);

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

  const fetchResults = async (uid) => {
    let snapshot = await db
      .collection("Results")
      .where("userId", "==", "2Q9dCnzHcvdK3nXdvwcWztKj9A83")
      .get();
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    setResult(data);
  };

  useEffect(() => {
    console.log("auth", auth?.currentUser.uid);

    db.collection("Users")
      .where("userId", "==", auth?.currentUser.uid)
      .get()
      .then((res) =>
        res.forEach((doc) => {
          setUser(doc.data());
        })
      );

    fetchResults();
  }, []);

  useEffect(() => {
    if (user) {
      fetchResults(user.uid);
    }
  }, [user]);

  useEffect(() => {
    console.log("result length: ", result.length);
  }, [result]);

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/question-bg-img.png")}
        style={styles.background}
      />
      <Text style={styles.email}>{user?.name}</Text>
      <Text style={styles.college}>{user?.college}</Text>
      <View style={styles.buttonDiv}>
        <Pressable style={styles.button} onPress={handleSignout}>
          <Text style={styles.buttonText}>logout</Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.contentDiv}
      >
        {
          <View
            style={{
              width: 350,
            }}
          >
            {result.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("result", {
                      submission: item.submission,
                      date: item.time,
                    });
                  }}
                  style={styles.questionViewButton}
                >
                  <View>
                    <View>
                      <Text style={styles.questionDate}>{item.time}</Text>
                    </View>
                    <Text style={styles.questionHeading}>
                      Test {index + 1}{" "}
                    </Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.statDiv}>
                      <Text style={{ ...styles.statNumber, color: "green" }}>
                        {findCorrect(item.submission)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.statDiv}>
                      <Text style={{ ...styles.statNumber, color: "red" }}>
                        {findIncorrect(item.submission)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.statDiv}>
                      <Text style={{ ...styles.statNumber, color: "grey" }}>
                        {findSkipped(item.submission)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        }
      </ScrollView>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}

      {/* <Pressable style={styles.button} onPress={handleSignout}>
        <Text style={styles.buttonText}>logout</Text>
      </Pressable> */}
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
    top: 0,
    width: "100%",
    zIndex: -1,
  },

  contentDiv: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 45,
  },

  email: {
    paddingHorizontal: 35,
    alignSelf: "flex-start",
    fontSize: 40,
    fontFamily: "ropasans-regular",
    textAlign: "left",
    alignSelf: "flex-start",
  },

  college: {
    paddingHorizontal: 35,
    alignSelf: "flex-start",
    fontSize: 15,
    fontFamily: "ropasans-regular",
    textAlign: "left",
    alignSelf: "flex-start",
  },

  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingRight: 20,
  },

  button: {
    margin: 5,
    width: 80,
    height: 30,
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 20,
  },
  questionViewButton: {
    padding: 20,
    margin: 3,
    backgroundColor: "rgba(255,171,171,0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  questionHeading: {
    fontFamily: "ropasans-regular",
    fontSize: 30,
  },
  questionDate: {
    width: "100%",
    fontFamily: "ropasans-regular",
    textAlign: "left",
    fontSize: 15,
  },
  statDiv: {
    margin: 2,
  },
  statNumber: {
    textAlign: "center",
    fontFamily: "ropasans-regular",
    fontSize: 40,
  },
});
