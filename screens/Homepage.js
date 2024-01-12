import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
export default function Homepage() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoaded] = useFonts({
    test: require("../assets/fonts/urdu-font.ttf"),
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

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <Text style={styles.subHeading}>Welcome, Psycho</Text>
      <Text style={styles.poetryOfDay}>Poetry of the Day</Text>
      <View style={[styles.box, styles.shadowProp]}>
        <Text style={{ fontFamily: "test", fontSize: 22 }}>
          تم تو خود سے بھی خوب صورت ہو
        </Text>
        <Text style={{ fontFamily: "test", fontSize: 22 }}>
          کس لیے دیکھتی ہو آئینہ
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
            source={require("../assets/faiz.jpg")}
            alt="Profile Image"
          />

          <Text style={styles.poetOfDay}>Faiz Ahmad Faiz</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162447",
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
