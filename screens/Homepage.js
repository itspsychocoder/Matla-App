import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import useUserStore from '../store/store';
import CarouselComponent from "../components/Carousel";

export default function Homepage() {
  const [dailyVerse, setDailyVerse] = useState({poet: {}});
  const username = useUserStore((state) => state.username);
  const setEmail = useUserStore((state) => state.setEmail);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);
  const setTotalFollowers = useUserStore((state) => state.setTotalFollowers);
  const setTotalFollowing = useUserStore((state) => state.setTotalFollowing);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const setTotalBookmarks = useUserStore((state) => state.setTotalBookmarks);


  const getProfileData = () => {
    console.log("Wait");
    fetch("https://poetry-app-admin-panel.vercel.app/api/profiles/get-profile-data", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username })

    })

      .then(res => res.json())
      .then(data => {
        
        console.log(data)
        if (data.type == "success") {
          setEmail(data.user.email);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setTotalFollowers(data.user.totalFollowers);
          setTotalFollowing(data.user.totalFollowing);
          setAvatar(data.user?.avatar);
          setTotalBookmarks(data.bookmarks);
       
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  const getPoetryOfDay = () => {
    console.log("Wait");
    fetch("https://poetry-app-admin-panel.vercel.app/api/daily-verse/get-verse")

      .then(res => res.json())
      .then(data => {
        
        console.log(data.verse)
        if (data.type == "success") {
          console.log(data.verse)
          setDailyVerse(data.verse)
       
          
       
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoaded] = useFonts({
    test: require("../assets/fonts/urdu-font.ttf"),
  });
  useEffect(() => {}, []);
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      console.log("Font Loaded");
    }
    getProfileData();
    getPoetryOfDay();
  }, [isLoaded]);

  if (!isLoaded) {
    console.log("ERRROR");
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <Text style={styles.subHeading}>Welcome, {firstName} {lastName}</Text>
      <Text style={styles.poetryOfDay}>Poetry of the Day</Text>
      <View style={[styles.box, styles.shadowProp]}>
      {/* <TouchableOpacity onPress={getPoetryOfDay} style={styles.flexDiv}>
     
      <Text style={styles.normalText}>
        
    Reload
      </Text>
    </TouchableOpacity> */}

        <Text style={{ fontFamily: "test", fontSize: 22 }}>
       
          {dailyVerse.verse?.split("\\n")[0]}

        </Text>
        <Text style={{ fontFamily: "test", fontSize: 22 }}>
          {dailyVerse.verse?.split("\\n")[1]}
        </Text>
       
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.avatar}
            source={{uri: dailyVerse.poet?.avatar}}
            alt="Profile Image"
          />

          <Text style={styles.poetOfDay}>{dailyVerse.poetName}</Text>
        </View>
      </View>

      <Text style={[styles.subHeading, {
        marginVertical: 20
      }]}>Poet Spotlight</Text>


      <CarouselComponent/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202632",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    width: 300,
    height: 200,
    

    backgroundColor: "#F8F4E3",
    textAlign: "center",
    padding: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  poetBox: {
    width: 300,
    height: 130,
    border: "2px solid black",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: "#F8F4E3",
    textAlign: "center",
    padding: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subHeading: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  poetryOfDay: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  poetOfDay: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  shadowProp: {  
    shadowOffset: {width: -2, height: 10},  
    shadowColor: '#171717',  
    
    elevation: 20, 
  },  
});
