import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import SeparatePages from "./navigation/separatePages";
import Auth from "./navigation/auth";
import { StyleSheet, Text, View, Image} from 'react-native';
import { useEffect, useState } from "react";
import useUserStore from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack"
import SplashScreen from "./components/SplashScreen";
import { RootSiblingParent } from 'react-native-root-siblings';
// import { JWT_TOKEN } from '@env';

export default function App() {
  const Stack = createStackNavigator();
  const JWT_TOKEN = "matla-secret";
  const isLogin = useUserStore((state) => state.isLogin);
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const username = useUserStore((state) => state.username);
  const setEmail = useUserStore((state) => state.setEmail);
  const setUsername = useUserStore((state) => state.setUsername);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);
  const setTotalFollowers = useUserStore((state) => state.setTotalFollowers);
  const setTotalFollowing = useUserStore((state) => state.setTotalFollowing);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const setUserId = useUserStore((state) => state.setUserId);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const isSingleVerse = useUserStore((state) => state.isSingleVerse);
  const [isSplash, setIsSplash] = useState(true)
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
          setUsername(data.username)
          setTotalFollowers(data.totalFollowers);
          setTotalFollowing(data.totalFollowing);
          setAvatar(data.avatar);
          setUserId(data.userId);
          setIsLogin(true);
        }
        else {
          
          setIsLogin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();

    setTimeout(() => {
      setIsSplash(false)
    }, 3000);
  }, []);
  return (
    <>
   {
    isSplash?(
      <SplashScreen/>
    ):(
<RootSiblingParent>

      <NavigationContainer>
      {
        isLogin?isSingleVerse?<SeparatePages/>:<Tabs/>:<Auth/>
      }


   

     
   </NavigationContainer>
       
      </RootSiblingParent>
    )
   }
      
    
    </>
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
