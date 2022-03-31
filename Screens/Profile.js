import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { auth, db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({ route, navigation }) {
  const handleSignout = () => auth.signOut();

  const [user, setUser] = useState(null);

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
  }, []);

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Text style={styles.email}>{user?.name}</Text>
      <Text style={styles.college}>{user?.college}</Text>
      <View style={styles.buttonDiv}>
        <Pressable style={styles.button} onPress={handleSignout}>
          <Text style={styles.buttonText}>setting</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSignout}>
          <Text style={styles.buttonText}>logout</Text>
        </Pressable>
      </View>
      <View style={styles.contentDiv}></View>
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
    opacity: 1,
    flex: -1,
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
});
