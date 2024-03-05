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
  const setUsername = useUserStore((state) => state.setUsername);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const setIsLogin = useUserStore((state) => state.setIsLogin);



  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [Username, SetUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("");

  const moveToSignup = () => {
    navigation.navigate("Reading");
  }

  const checkLogin = () => {
    console.log("Wait");
    fetch("http://192.168.56.1:3000/api/auth/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: Username, firstName: firstName, lastName: lastName, email: email, password: password })

    })

      .then(res => res.json())
      .then(data => {
        Alert.alert(data.message)
        console.log(data.message)
        if (data.type == "success") {
          navigation.navigate('Login')
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
        <Text style={styles.subHeading}>Signup</Text>


        <TextInput
          editable
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter email"
          keyboardType="email-address"
          placeholderTextColor="white"
          
          />
        <TextInput
          editable
          style={styles.input}
          value={Username}
          onChangeText={text => SetUsername(text)}
          placeholder="Username"
          keyboardType="default"
          placeholderTextColor="white"
          
          />
        <TextInput
          editable
          style={styles.input}
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholder="First Name"
          keyboardType="default"
          placeholderTextColor="white"
          
          />
        <TextInput
          editable
          style={styles.input}
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholder="Last Name"
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