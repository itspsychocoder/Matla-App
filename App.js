import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import SeparatePages from "./navigation/separatePages";
import Auth from "./navigation/auth";
import SingleVerse from "./screens/SingleVerse"
import { StyleSheet, Text, View, Image} from 'react-native';
import { useEffect, useState } from "react";
import useUserStore from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack"
// import { JWT_TOKEN } from '@env';

import 'react-native-gesture-handler';
export default function App() {
  const Stack = createStackNavigator();
  const JWT_TOKEN = "matla-secret";
  const isLogin = useUserStore((state) => state.isLogin);
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const username = useUserStore((state) => state.username);
  const setEmail = useUserStore((state) => state.setEmail);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);
  const setTotalFollowers = useUserStore((state) => state.setTotalFollowers);
  const setTotalFollowing = useUserStore((state) => state.setTotalFollowing);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const isSingleVerse = useUserStore((state) => state.isSingleVerse);
const Tab = createBottomTabNavigator();

  useEffect(() => {

    
    const checkToken = async () => {
      let token = await AsyncStorage.getItem("token");

      try {
        const data = JWT.decode(token, JWT_TOKEN);
        console.log(data);
        if (data) {
          setEmail(data.email);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setTotalFollowers(data.totalFollowers);
          setTotalFollowing(data.totalFollowing);
          setAvatar(data.avatar);
        }
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);
  return (
    <NavigationContainer>
       {
      isLogin?isSingleVerse?<SeparatePages/>:<Tabs/>:<Auth/>
    }


    

      
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
  },
});
