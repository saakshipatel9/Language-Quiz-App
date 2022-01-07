import { Button, StyleSheet, Text, View } from "react-native";

export function Dictionary({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dictionary</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
    </View>
  );
}
