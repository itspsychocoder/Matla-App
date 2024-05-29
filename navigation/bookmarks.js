import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert } from "react-native";

import Login from "../screens/Login";
import SingleVerse from "../screens/SingleVerse";
import Bookmarks from "../screens/Bookmarks"
const Tab = createBottomTabNavigator();

import useUserStore from "../store/store";
import { useEffect } from "react";
export default function Tabs({}) {



  return (
    <Tab.Navigator
    
      screenOptions={{
        tabBarVisible: false,
        tabBarStyle: { display: "none" },
      }}
>


<Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
      
        options={({ navigation }) => ({
          title: "Bookmarks",
          headerShown: false,
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="Back" />
          ),
        })}
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
