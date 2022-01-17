import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

export function Login({ navigation }) {
  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Text style={styles.title}>login to continue</Text>
        <TextInput style={styles.input} placeholder="email" />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>login</Text>
        </Pressable>
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
    fontSize: 30,
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
