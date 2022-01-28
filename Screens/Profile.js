import { useEffect } from "react";
import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { auth } from "../firebase";

export function Profile({ navigation }) {
  const handleSignout = () => auth.signOut();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />

      <Text>Email: {auth.currentUser?.email}</Text>

      <Pressable style={styles.button} onPress={handleSignout}>
        <Text style={styles.buttonText}>logout</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
  },
  background: {
    position: "absolute",
    opacity: 1,
    flex: -1,
  },
  button: {
    margin: 5,
    width: 125,
    height: 40,
    backgroundColor: "black",
    color: "white",
    alignSelf: "flex-end",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
