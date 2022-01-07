import { Button, StyleSheet, Text, View } from "react-native";

export function About({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Screen</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
    </View>
  );
}
