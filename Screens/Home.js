import { Button, StyleSheet, Image, Text, View } from "react-native";

export function Home({ navigation }) {
  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      {/* <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
      <Button onPress={() => navigation.navigate("quiz")} title="quiz" />
      <Button
        onPress={() => navigation.navigate("dictionary")}
        title="dictionary"
      /> */}
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
});
