import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Post from "../components/Post"
import { BackHandler } from 'react-native';
import { StyleSheet, TextInput,Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import useUserStore from "../store/store";


export default function Search() {
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const verseId = useUserStore((state) => state.verseId);

  useEffect(() => {
    const backAction = () => {
      setIsSingleVerse(false)
      // Handle your back button press logic here
      // For example, navigate back to previous screen, show an alert, etc.
      // Return true to prevent the default back button behavior (exit the app)
      // Return false to allow the default back button behavior (navigate back)
      
      // Example:
      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      // return true; // Prevent default back button behavior
      return false; // Allow default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);



  const [verses, setVerses] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const searchKeyword = async() => {
    setIsLoading(true);
    console.log("Finding Single Verse", verseId);
    fetch("http://192.168.56.1:3000/api/verses/get-single-verse", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ verseId: verseId })
      
    })
    
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.type == "success") {
        console.log(data.verse)
      }
    })
    .catch(error => {
      console.log(error)
    })
    setIsLoading(false);
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.subHeading}>Single Verse: {verseId}</Text>
 
      
 <TouchableOpacity onPress={searchKeyword}>
  <Text>Fetch</Text>
 </TouchableOpacity>
  
      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,

    flex: 1,
    minHeight: 900,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#162447",

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
  button: {
    marginHorizontal: 5,
    backgroundColor: "orange",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  subHeading: {
    fontSize: 18
  },
  noVerseFound: {
    color: "white",
    fontSize: 20,
    marginVertical: 20
  }

});