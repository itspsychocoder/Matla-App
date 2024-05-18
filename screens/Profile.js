import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../store/store';


import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function Profile({navigation}) {
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const firstName = useUserStore((state) => state.firstName);
  const userId = useUserStore((state) => state.userId);
  const lastName = useUserStore((state) => state.lastName);
  const username = useUserStore((state) => state.username);
  const avatar = useUserStore((state) => state.avatar);
  const totalFollowers = useUserStore((state) => state.totalFollowers);
  const totalBookmarks = useUserStore((state) => state.totalBookmarks);
  const totalFollowing = useUserStore((state) => state.totalFollowing);

  const logout = () => {
    AsyncStorage.removeItem("token");
    setIsLogin(false)
  }

  const reportBug = () => {
    Alert.alert("Opening Report Page");
  }
  const openBookmarks = () => {
    Alert.alert("Bookmark Page");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
     <View style={styles.flexDiv}>
     <Image style={styles.avatar} source={require("../assets/profile.jpg")} alt='Profile Image'/>
     <View style={styles.dataDiv}>
      <Text style={styles.subHeading}>{firstName} {lastName}</Text>
      <Text style={styles.username}>@{username}</Text>
     </View>
     </View>

    <View style={styles.flexDiv}>


     <View style={styles.card}>
    <Text style={styles.cardHeading}>Following</Text>
    <Text style={styles.cardNumber}>{totalFollowing}</Text>
     </View>
     <View style={styles.card}>
    <Text style={styles.cardHeading}>Bookmarks</Text>
    <Text style={styles.cardNumber}>{totalBookmarks}</Text>
     </View>


    
    
    </View>

    <Text style={styles.subHeading}>Profile</Text>


   <View style={styles.settingsContainer}>
   <TouchableOpacity onPress={openBookmarks} style={styles.flexDiv}>
      <View style={{marginHorizontal: 10}}>

      <MaterialIcons name="bookmark" size={18} color="white" />
      </View>
      <Text style={styles.normalText}>
        
   Bookmarks
      </Text>
    </TouchableOpacity>

{/*     
    <View style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/certificate.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
    Badges
      </Text>
    </View> */}



   </View>
    <Text style={styles.subHeading}>Account</Text>

  <View style={styles.settingsContainer}>

    {/* <View  style={styles.flexDiv}>
      <Text style={styles.icon}>        <Image source={require("../assets/icons/display.png")}/>
      </Text>
      <Text style={styles.normalText}>
        
    Display Settings
      </Text>
    </View> */}
      
      <TouchableOpacity onPress={reportBug} style={styles.flexDiv}>
      <View style={{marginHorizontal: 10}}>

      <MaterialIcons name="bug-report" size={18} color="white" />
      </View>
      <Text style={styles.normalText}>
        
    Report a Bug
      </Text>
    </TouchableOpacity>
      
    <TouchableOpacity onPress={logout} style={styles.flexDiv}>
      <View style={{marginHorizontal: 10}}>

    <AntDesign name="logout" size={18} color="white" />
      </View>
      <Text style={styles.normalText}>
        
    Logout
      </Text>
    </TouchableOpacity>

  </View>
{/* 
  <View>
    <Text style={{color: "white"}}>User Id: {userId}</Text>
  </View> */}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011627',
    justifyContent: "center",
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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  heading: {
    color: "white",
    fontSize: 25,
    marginVertical: 20,
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
    color: "white",
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
    marginVertical: 5,
    color: "white"
  },
  icon: {
    marginHorizontal: 2
  },
  username: {
    color: "white"
  }

});