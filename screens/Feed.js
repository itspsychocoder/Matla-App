import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Post from "../components/Post"
export default function Feed() {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Feed</Text>
     <Post/>
     <Post/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: "#162447",
    alignItems: 'center',
    justifyContent: 'center',
  },

 
 

  subHeading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }

});