import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Post from "../components/Post"
import { useEffect, useState } from 'react';
export default function Feed() {
  const [verses, setVerses] = useState([])
  const getVerses = () => {
    
    console.log("Wait");
    fetch("http://192.168.56.1:3000/api/verses/get-verses-infinite")

      .then(res => res.json())
      .then(data => {
       console.log(data.verses)
        if (data.type == "success") {
         setVerses(data.verses)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  useEffect(() => {
    getVerses();
  }, [])
  
  return (
    <ScrollView>

    <View style={styles.container}>
     <View style={styles.flex}>
     <Text style={styles.subHeading}>Feed</Text>
      <TouchableOpacity onPress={getVerses} style={styles.button}>
     
      <Text style={styles.normalText}>
        
    Reload
      </Text>
    </TouchableOpacity>
     </View>
      {
        verses.map((verse, index)=> {
          return <Post verseId={verse._id} poet={verse.poetName} verse={verse.verse} key={index}/>
        })
      }
      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: "#202632",
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%"
  },
  button: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "#804fcb",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  
  
  

  subHeading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  normalText: {
    color: "white"
  }

});