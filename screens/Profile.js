import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../store/store';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {storage} from "../firebase/firebaseStorage"
import * as DocumentPicker from "expo-document-picker";
import Toast from 'react-native-root-toast';
import * as WebBrowser from 'expo-web-browser';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
export default function Profile({navigation}) {
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const setScreen = useUserStore((state) => state.setScreen);
  const setAvatar = useUserStore((state) => state.setAvatar);
  const firstName = useUserStore((state) => state.firstName);
  const userId = useUserStore((state) => state.userId);
  const lastName = useUserStore((state) => state.lastName);
  const username = useUserStore((state) => state.username);
  const avatar = useUserStore((state) => state.avatar);
  const totalFollowers = useUserStore((state) => state.totalFollowers);
  const totalBookmarks = useUserStore((state) => state.totalBookmarks);
  const setIsBookmark = useUserStore((state) => state.setIsBookmark);
  const totalFollowing = useUserStore((state) => state.totalFollowing);
  const [file,setFile] = useState({});


  const openFeedbackForm = async () => {
    await WebBrowser.openBrowserAsync("https://forms.gle/oSMviMPZPeM2kf7E8");
  };

  function generateFilename(extension) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    
    const filename = `${year}${month}${day}_${hours}${minutes}${seconds}.${extension}`;
    return filename;
}

const updateAvatar = async(url)=> {

  const data = {
    avatar: url, userId: userId 
  }
  console.log(data)

  const req =await  fetch(
    `https://poetry-app-admin-panel.vercel.app/api/profiles/update-avatar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
  const request = await req.json();

  console.log(request)

  // Toast.show(request.message)

  Toast.show(request.message)


}
  const getFileExtension = (fileName) => {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const handleUploadFile = async(fileExtension) => {
    Toast.show("Uploading...")
    const response = await fetch(file.assets[0].uri);
      const blob = await response.blob();


      const fileName =generateFilename(fileExtension);
      console.log("file name is: ", fileName)
    if (file) {
      // setUploadProgressCaption("Uploading...")
      const name = "test.png"
      const storageRef = ref(storage, `dp/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100


          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
            //url is download url of file
       
            console.log(url)
            setAvatar(url);
            await updateAvatar(url);
          })
        },
      )
    } else {
      console.error('File not found')
    }
  }
  const _pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
    
    // alert(result.assets[0].uri);
    
    console.log(result);
    setFile(result)

    const fileExtension = await getFileExtension(result.assets[0].name);
    console.log(`File Extension: ${fileExtension}`)

    const size = result.assets[0].size;

    const fileSizeInMB = size / (1024 * 1024);

    if(fileSizeInMB > 5 ){
      Toast.show("Pick picture of size less than 5 MB")

    }
    else {
      await handleUploadFile(fileExtension)

    }
    
    }
  const logout = () => {
    AsyncStorage.removeItem("token");
    setIsLogin(false)
  }

  const openBookmarks = () => {
    Alert.alert("Bookmark Page");
    setScreen("Bookmarks");
    setIsSingleVerse(false);
    setIsBookmark(true);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
     <View style={styles.flexDiv}>
      {
        avatar==""?(
          <TouchableOpacity onPress={_pickDocument}>
          <Image style={styles.avatar} source={require("../assets/profile.jpg")} alt='Profile Image'/>
          </TouchableOpacity>
          ):(
            
          <TouchableOpacity onPress={_pickDocument}>

            <Image style={styles.avatar} source={{uri:avatar}} alt='Profile Image'/>
            </TouchableOpacity>
            
          )
        }
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

{/* <Button
title="Select Document"
onPress={this._pickDocument}
/>
<Button
title="Upload"
onPress={handleUploadFile}
/> */}
      
      <TouchableOpacity onPress={openFeedbackForm} style={styles.flexDiv}>
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
    backgroundColor: '#0d0d15',
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
    backgroundColor: "#302f3f",
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