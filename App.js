import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { Login } from "./Screens/Login";
import { Home } from "./Screens/Home";
import { About } from "./Screens/About";
import { Profile } from "./Screens/Profile";
import { Quiz } from "./Screens/Quiz";
import { Dictionary } from "./Screens/Dictionary";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="quiz" component={Quiz} />
          <Stack.Screen name="dictionary" component={Dictionary} />
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="login" component={Login} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="about" component={About} />
      <Tab.Screen name="profile" component={Profile} />
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
