import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
export default function Homepage({verse, poet}) {
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
            

            <TouchableOpacity onPress={()=>navigation.navigate("SingleVerse")} style={styles.actionBtn}>
              <Image
                style={{ marginHorizontal: 3 }}
                source={require("../assets/icons/explore.png")}
              />
              <Text>Explore</Text>
            </TouchableOpacity>



            <View style={styles.actionBtn}>
              <Image
                style={{ marginHorizontal: 3 }}
                source={require("../assets/icons/picit.png")}
              />
              <Text>Pic It</Text>
            </View>

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
