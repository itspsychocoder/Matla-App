import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import SinglePost from "../components/SinglePost"
import { BackHandler } from 'react-native';
import { StyleSheet, Image, TextInput,Text, Alert, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import useUserStore from "../store/store";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useFonts } from 'expo-font';


export default function Search() {
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const poetId = useUserStore((state) => state.poetId);

  const [verse, setVerse] = useState({});
  const [inputText, setInputText] = useState('Test');
  const [imageUri, setImageUri] = useState(null);
  const [isLoaded] = useFonts({
    test: require("../assets/fonts/urdu-font.ttf"),
  });
 
  useEffect(() => {
    searchKeyword();
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



  const [poet, setPoet] = useState({});
  const [verses, setVerses] = useState(0)
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const searchKeyword = async() => {
    setIsLoading(true);
    console.log("Finding Single Verse", poetId);
    fetch("http://192.168.56.1:3000/api/poets/get-single-poet", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ poetId: poetId })
      
    })
    
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.type == "success") {
        console.log(data.poet)
        setPoet(data.poet)
        setVerses(data.verses)
      }
    })
    .catch(error => {
      console.log(error)
    })
    setIsLoading(false);
  }
  return (
    <ScrollView>
    <View style={styles.container} >

<View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
  <View >

  <Image
   style={styles.avatar}
  source={{uri: poet.avatar}}/>
  </View>
  

 

  <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

  <Text style={{color: "white",fontFamily: 'test',fontSize: 35, marginHorizontal: 10}}>

      {poet.poetName}
  </Text>

  
  <Image
   style={styles.tick}
  source={require("../assets/icons/tick-icon.png")}/>
  </View>

  <Text style={styles.bio}>
  {poet.bio}
  </Text>
  </View>

      
 {/* <TouchableOpacity onPress={searchKeyword}>
  <Text>Fetch</Text>
 </TouchableOpacity> */}

 <View style={{display: "flex", flexDirection: "row"}}>
  <View style={styles.card}>
    <Text style={styles.number}>20</Text>
    <Text style={styles.title}>Followers</Text>
  </View>
  <View style={styles.card}>
  <Text style={styles.number}>{verses}</Text>
    <Text style={styles.title}>Verses</Text>
  </View>
 </View>

 <TouchableOpacity style={styles.followBtn}>
  <Text style={{fontSize: 20, color: "white"}}>
  Follow
  </Text>
 </TouchableOpacity>

 <Text style={styles.heading}>Poet Info</Text>

 <View style={{display: "flex", flexDirection: "row"}}>
  <View style={styles.miniCard}>
    <Text style={styles.miniNumber}>{poet.dateOfBirth}</Text>
    <Text style={styles.miniTitle}>Date of Birth</Text>
  </View>
  <View style={styles.miniCard}>
  <Text style={styles.miniNumber}>{poet.location}</Text>
    <Text style={styles.miniTitle}>Location</Text>
  </View>
 </View>


      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  bio: {
    color: "white",
    fontSize: 18,
    marginVertical:10,
    fontFamily: "test",
    textAlign: "center"
  },
  heading: {

    fontSize: 25,
    color: "white",
    marginVertical: 20
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  miniCard: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {
    fontSize: 50,
    fontWeight: "bold"
  },
  miniNumber: {
    fontSize: 30,
    fontWeight: "bold"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"

  },
  miniTitle: {
    fontSize: 15,
    fontWeight: "bold"

  },
  followBtn: {
    marginVertical: 20,
    color: "white",
    fontSize: 20,
    backgroundColor: "#562998",
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20

  },
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginHorizontal: 10,
  },
  tick: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
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