import { useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

export function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
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
