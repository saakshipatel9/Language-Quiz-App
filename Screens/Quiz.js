import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";

export function Quiz({ navigation }) {
  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("question");
        }}
      >
        <Text style={styles.start}>Start</Text>
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
