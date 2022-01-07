import { Button, StyleSheet, Text, View } from "react-native";

export function Quiz({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Quiz</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
    </View>
  );
}
