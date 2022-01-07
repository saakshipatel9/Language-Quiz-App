import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { Button } from "react-native";

export function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Enter Email</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <Button title="Login" onPress={() => navigation.navigate("home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    minWidth: 200,
    borderWidth: 1,
    padding: 10,
  },
});
