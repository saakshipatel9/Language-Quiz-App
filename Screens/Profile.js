import { Button, StyleSheet, Text, View } from "react-native";

export function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
      <Button onPress={() => navigation.navigate("login")} title="login" />
    </View>
  );
}
