import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useEffect } from "react";

export function Setting({ route, navigation }) {
  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Text>Made by</Text>
      <Text style={styles.names}>
        Aniket Singh Rawat (19IT429) {"\n"} Saakshi Patel (19IT434)
      </Text>
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
    paddingTop: 0,
  },
  background: {
    position: "absolute",
    opacity: 1,
    flex: -1,
  },
  names: {
    fontSize: 20,
    fontFamily: "ropasans-regular",
    textAlign: "center",
    marginTop: 10,
  },
});
