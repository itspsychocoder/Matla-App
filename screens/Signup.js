import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import useUserStore from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true);
    console.log("Wait");

    if(username=="" || firstName == "" || lastName=="" || email=="" || password=="" ){
      Toast.show("Please fill all the details");
    setIsLoading(false);
      return;
    }
    fetch("https://poetry-app-admin-panel.vercel.app/api/auth/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: Username, firstName: firstName, lastName: lastName, email: email, password: password })

    })

      .then(res => res.json())
      .then(data => {
        Toast.show(data.message)
        console.log(data.message)
        if (data.message=="11000") {
          Toast.show("User already exists with this username/email")
        }
        else {
          Toast.show(data.message)

        }
        if (data.type == "success") {

          
          navigation.navigate('Login')
        }
      })
      .catch(error => {
   
          Toast.show("Unknown error occured")
        
        console.log(error)
      })

    setIsLoading(false);

  }

  return (
    <ImageBackground source={require('../assets/login.jpg')} style={styles.mainContainer}>
{/* <View style={styles.mainContainer}> */}

      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/icon.png")}/>
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
        <ActivityIndicator animating={isLoading} color={"#fff"} size={"small"}/>

          <Text style={styles.loginText}>Create Account</Text>
      
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Login')}>
          
          <Text style={styles.text}>Have an account? Login</Text>
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
    color: "red",
    backgroundColor: "#2081C3",

    
    display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: "center"
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
  },
  loginText: {
    color: "white"
  }

});