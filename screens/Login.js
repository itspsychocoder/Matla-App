import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import useUserStore from '../store/store';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const avatar = useUserStore((state) => state.avatar);
  const username = useUserStore((state) => state.username);
  const isLogin = useUserStore((state) => state.isLogin);
  const setIsLogin = useUserStore((state) => state.setIsLogin);

  const setUsername = useUserStore((state) => state.setUsername);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);
  const setTotalFollowers = useUserStore((state) => state.setTotalFollowers);
  const setTotalFollowing = useUserStore((state) => state.setTotalFollowing);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const setUserId = useUserStore((state) => state.setUserId);

  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const moveToSignup = () => {
    navigation.navigate("Reading");
  }

  const checkLogin = () => {
    console.log("Wait");
    fetch("https://poetry-app-admin-panel.vercel.app/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password: password })

    })

      .then(res => res.json())
      .then(data => {
        Alert.alert(data.message)
        console.log(data)
        Alert.alert(data.userId)
        if (data.type == "success") {
          setUsername(email);
          setIsLogin(true);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setUsername(data.username)
          setTotalFollowers(data.totalFollowers);
          setTotalFollowing(data.totalFollowing);
          setAvatar(data.avatar);
          setUserId(data.userId);
          Alert.alert(data.userId)
          AsyncStorage.setItem("token", data.token);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ImageBackground source={require('../assets/login.jpg')} style={styles.mainContainer}>
{/* <View style={styles.mainContainer}> */}

      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/profile.jpg")}/>
        <Text style={styles.heading}>Matla</Text>
        <Text style={styles.subHeading}>Login</Text>


        <TextInput
          editable
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Username"
          keyboardType="default"
          placeholderTextColor="white"
          
          />
        <TextInput
          editable
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="white"
          secureTextEntry={true}
          keyboardType="default"
          />

        <TouchableOpacity style={styles.button} onPress={checkLogin}>
        <LinearGradient
        colors={['#C3E6ED', '#E2D6E8', '#C4E6D8', '#D9D9D9']}
        style={styles.gradient}
        >
          <Text style={styles.loginText}>Login</Text>
        </LinearGradient>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Signup')}>
          
          <Text style={styles.text}>Don't have an account? Click here</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  // </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30
  },
  gradient: {
    width: "107%",
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

  },
  text: {
    color: "white"
  },
  signup: {
    alignItems: 'center',
    padding: 10,
    width: "80%",
    color: "white"
  },
  button: {
    alignItems: 'center',
    padding: 10,
    width: "80%",
    marginTop: 10,
    borderRadius: 10,
    // background: "",
    color: "red"
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  mainContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'

  },

  boxContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
  },

  box: {
    backgroundColor: "#EEEFFF",
    width: 150,
    height: 100,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
  },

  heading: {
    // color: "#162447",
    color: "white",
   
    fontSize: 30,
    marginVertical: 10

  },

  subHeading: {
    // color: "#162447",
    color: "white",

    fontSize: 18
  },

  description: {
    fontSize: 12
  },

  summaryHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20
  }

});