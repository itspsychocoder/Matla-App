import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
export default function Homepage() {
 
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          CustomFont: require('../assets/fonts/cabin.ttf'),
        });
        console.log("Loaded")
        setIsFontLoaded(true);
      } catch (error) {
        console.error('Error loading font:', error);
        setIsFontLoaded(false);
      }
    };

    loadCustomFont();
  }, []);

  if (!isFontLoaded) {
    console.log("FONTERROR")
    return null; // You can render a loading indicator here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Welcome, Psycho</Text>
      <Text style={styles.poetryOfDay}>Poetry of the Day</Text>
<View style={styles.box}>
<Text style={styles.poetryOfDay}>
تم تو خود سے بھی خوب صورت ہو
</Text>
      <Text style={styles.poetryOfDay}>کس لیے دیکھتی ہو آئینہ</Text>
      <Text style={styles.poetryOfDay}>Jaun Elia</Text>
</View>

      <Text style={styles.poetryOfDay}>Categoriess</Text>
     
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: "#F8F4E3",
    textAlign: "center",
    padding: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "10px 10px 14px 3px rgba(0,0,0,51)"
  },
 
 

  subHeading: {
    color: "#162447",
    fontSize:25,
    fontWeight: "bold"
  },
  poetryOfDay: {
    marginVertical:20,
    fontSize:18,
    fontWeight: "bold",
  }

});