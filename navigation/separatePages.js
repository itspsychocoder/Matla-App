import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Login from "../screens/Login";
import SingleVerse from "../screens/SingleVerse";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarVisible: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="SingleVerse"
        component={SingleVerse}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
