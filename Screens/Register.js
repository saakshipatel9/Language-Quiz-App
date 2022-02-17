import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { auth, db } from "../firebase";

export function Register({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    setLoading(true);

    if (!name) {
      alert("Please enter name");
      setLoading(false);
      return;
    }
    if (!email) {
      alert("Please enter email");
      setLoading(false);
      return;
    }
    if (!password) {
      alert("Please enter password");
      setLoading(false);
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((creds) => {
        const user = creds.user;
        console.log(user);
        db.collection("Users")
          .doc()
          .set({
            college: college,
            name: name,
            email: user.email,
            userId: user.uid,
          })
          .then(() => {
            console.log("user added");
          });
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
      <Image
        resizeMode="cover"
        source={require("../assets/login-form-bg-img.png")}
        style={styles.background}
      />
      <View style={styles.form}>
        <Text style={styles.title}>first time?</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="college"
          value={college}
          onChangeText={(text) => setCollege(text)}
        />
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

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>register</Text>
        </Pressable>

        <Text onPress={() => navigation.navigate("login")}>
          Already have an account?{" "}
          <Text style={{ color: "#0D8BFF" }}>Login</Text>
        </Text>
      </View>
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
    marginBottom: 120,
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
