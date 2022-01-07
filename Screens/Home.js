import { Button, StyleSheet, Text, View } from "react-native";

export function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
      <Button onPress={() => navigation.navigate("quiz")} title="quiz" />
      <Button
        onPress={() => navigation.navigate("dictionary")}
        title="dictionary"
      />
    </View>
  );
}
