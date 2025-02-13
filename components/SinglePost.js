import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, Alert,  View, ScrollView, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState, useRef } from "react";
import useUserStore from "../store/store";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
export default function Homepage({verseId,verse, poet}) {
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const setVerseId = useUserStore((state) => state.setVerseId);
  const captureViewRef = useRef(null);
  
  const [imageUri, setImageUri] = useState(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoaded] = useFonts({
    test: require("../assets/fonts/urdu-font.ttf"),
  });
  const [watermarkFont] = useFonts({
    english: require("../assets/fonts/matla.ttf"),
  });
  useEffect(() => {}, []);
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      console.log("Font Loaded");
    }
  }, [isLoaded]);

  if (!isLoaded) {
    console.log("ERRROR");
    return null;
  }

  const handleConvert = async () => {
   
    try {
      await captureView();
    } catch (error) {
      console.error('Error converting text to image:', error);
      Alert.alert('Error', 'Failed to convert text to image.');
    }
  };
  const captureView = async () => {
    try {
      const uri = await captureRef(captureViewRef, { format: 'png', quality: 1 });
      setImageUri(uri);
      saveImageToLibrary(uri);
    } catch (error) {
      console.error('Error capturing view:', error);
      throw error;
    }
  };

  const saveImageToLibrary = async (uri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Image saved to library.');
    } else {
      Alert.alert('Permission Required', 'Permission to access media library is required to save images.');
    }
  };

  return (
    

    <View ref={captureViewRef}  style={styles.container} onLayout={handleOnLayout}>
      <View style={[styles.box, styles.shadowProp]}>
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
            source={require("../assets/faiz.jpg")}
            alt="Profile Image"
            />

          <Text style={styles.poetOfDay}>@{poet}</Text>
        </View>
        <Text style={{ fontFamily: "test", fontSize: 22 }}>
          {verse?.split("\\n")[0]}
        </Text>
        <Text style={{ fontFamily: "test", fontSize: 22 }}>
          {verse?.split("\\n")[1]}
        </Text>

        <Text style={{
          marginBottom: 5,
          fontFamily: "english",
          fontSize: 20
        }}>
          Made with Matla
        </Text>

        <View
          style={{
            width: 300,
            height: "100px",
            borderTopWidth: 2,
            borderColor: "black",
          }}
          >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 10,
            }}
            >
            <View style={styles.actionBtn}>
              <Image
                style={{ marginHorizontal: 3 }}
                source={require("../assets/icons/like.png")}
              />
              <Text>Like</Text>
            </View>
            

            <TouchableOpacity onPress={()=>{
              setVerseId(verseId);
              setIsSingleVerse(true);
            }} style={styles.actionBtn}>
              <Image
                style={{ marginHorizontal: 3 }}
                source={require("../assets/icons/explore.png")}
              />
              <Text>Explore</Text>
            </TouchableOpacity>



            <TouchableOpacity  onPress={handleConvert}  style={styles.actionBtn}>
              <Image
                style={{ marginHorizontal: 3 }}
                source={require("../assets/icons/picit.png")}
              />
              <Text>Pic It</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#0d0d15"
  },
  actionBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    height: 240,

    backgroundColor: "#F8F4E3",
    textAlign: "center",
    padding: 10,
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
    padding:10,
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
    marginVertical:5,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  poetOfDay: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 10 },
    shadowColor: "#171717",

    elevation: 20,
  },
});
