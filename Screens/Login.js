import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

import { auth } from "../firebase";

export function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((creds) => {
        const user = creds.user;
        console.log(user);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return loading ? (
    <View style={styles.main}>
      <Text>Loading...</Text>
      <Image
        resizeMode="cover"
        source={require("../assets/login-form-bg-img.png")}
        style={styles.background}
      />
    </View>
  ) : (
    <View style={styles.main}>
      <View style={styles.form}>
        <Text style={styles.title}>login to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>login</Text>
        </Pressable>

        <Text onPress={() => navigation.navigate("register")}>
          No account yet?{" "}
          <Text style={{ color: "#0D8BFF" }}>Register here</Text>
        </Text>
      </View>
      <Image
        resizeMode="cover"
        source={require("../assets/login-form-bg-img.png")}
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

  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 30,
  },

  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  title: {
    fontFamily: "ropasans-regular",
    fontSize: 30,
    margin: 5,
  },

  input: {
    margin: 5,
    height: 40,
    width: 250,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderColor: "black",
    borderWidth: 3,
    fontSize: 20,
    fontFamily: "ropasans-regular",
  },

  button: {
    margin: 5,
    width: 125,
    height: 40,
    backgroundColor: "black",
    color: "white",
    alignSelf: "flex-end",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "ropasans-regular",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
