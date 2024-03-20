import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../store/store';

export default function Profile({navigation}) {
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const username = useUserStore((state) => state.username);
  const avatar = useUserStore((state) => state.avatar);
  const totalFollowers = useUserStore((state) => state.totalFollowers);
  const totalFollowing = useUserStore((state) => state.totalFollowing);

  const logout = () => {
    AsyncStorage.removeItem("token");
    setIsLogin(false)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
     <View style={styles.flexDiv}>
     <Image style={styles.avatar} source={require("../assets/profile.jpg")} alt='Profile Image'/>
     <View style={styles.dataDiv}>
      <Text style={styles.subHeading}>{firstName} {lastName}</Text>
      <Text>@{username}</Text>
     </View>
     </View>

    <View style={styles.flexDiv}>


     <View style={styles.card}>
    <Text style={styles.cardHeading}>Followers</Text>
    <Text style={styles.cardNumber}>{totalFollowers}</Text>
     </View>


     <View style={styles.card}>
    <Text style={styles.cardHeading}>Following</Text>
    <Text style={styles.cardNumber}>{totalFollowing}</Text>
     </View>
    
     
     <View style={styles.card}>
    <Text style={styles.cardHeading}>Streak</Text>
    <Text style={styles.cardNumber}>9</Text>
     </View>
    
    
    </View>

    <Text style={styles.subHeading}>Profile</Text>


   <View style={styles.settingsContainer}>
   <View style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/heart.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
     Add to Favourites
      </Text>
    </View>

    
    <View style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/certificate.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
    Badges
      </Text>
    </View>



   </View>
    <Text style={styles.subHeading}>Account</Text>

  <View style={styles.settingsContainer}>

    <View  style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/display.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
    Display Settings
      </Text>
    </View>

      
    <TouchableOpacity onPress={()=>navigation.navigate("SingleVerse")} style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/logout.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
    Logout
      </Text>
    </TouchableOpacity>

  </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202632',
    alignItems: 'center',
  },
  settingsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  flexDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15
  },

  dataDiv: {
    marginHorizontal: 10
  },
  subHeading: {
    color: "#162447",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  heading: {
    color: "#162447",
    fontSize: 25,
    marginVertical: 5,
    fontWeight: "bold"

  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "red",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0F0D",
    marginHorizontal: 5,
    marginVertical: 20
  },
  cardHeading: {
    color: "#F8F4E3",
    fontSize: 15,
    fontWeight: "bold"
  },
  cardNumber: {
    color: "#F8F4E3",
    fontSize: 30,
    fontWeight: "bold"
  },
  normalText: {
    fontSize: 15,
    marginVertical: 5
  },
  icon: {
    marginHorizontal: 2
  }

});