import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Auth from "./navigation/auth";
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import useUserStore from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
// import { JWT_TOKEN } from '@env';
export default function App() {
  const JWT_TOKEN = "matla-secret";
  const isLogin = useUserStore((state) => state.isLogin);
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const setFullName = useUserStore((state) => state.setFullName);
  const setEmail = useUserStore((state) => state.setEmail);
  useEffect(() => {
    
    const checkToken = async () => {
      let token = await AsyncStorage.getItem("token");

      try {
        const data = JWT.decode(token, JWT_TOKEN);
        console.log(data);
        if (data) {
          setFullName(data.fullName);
          setEmail(data.email);
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
      isLogin?<Tabs/>:<Auth/>
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
