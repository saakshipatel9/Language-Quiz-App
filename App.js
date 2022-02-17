import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { Login } from "./Screens/Login";
import { Home } from "./Screens/Home";
import { Dictionary } from "./Screens/Dictionary";
import { Setting } from "./Screens/Setting";
import { Profile } from "./Screens/Profile";
import { Quiz } from "./Screens/Quiz";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { auth } from "./firebase";
import { Register } from "./Screens/Register";
import { Question } from "./Screens/Question";

const fetchFonts = () => {
  return Font.loadAsync({
    "ropasans-regular": require("./assets/fonts/RopaSans-Regular.ttf"),
    // "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    // "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    // "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dataLoad, setDataLoad] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsub;
  }, []);

  if (!dataLoad) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoad(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
          </Stack.Group>
        )}

        {user && (
          <Stack.Group>
            <Stack.Screen
              name="root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="quiz" component={Quiz} />
            <Stack.Screen name="dictionary" component={Dictionary} /> */}
            <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="question"
              component={Question}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFABAB",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="dictonary"
        component={Dictionary}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-alphabet"
              color={color}
              size={40}
            />
          ),
        }}
      />

      <Tab.Screen
        name="quiz"
        component={Quiz}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="game-controller" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
