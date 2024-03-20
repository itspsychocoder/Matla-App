import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Post from "../components/Post"

import { StyleSheet, TextInput,Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

export default function Search() {
  const [verses, setVerses] = useState([]);
  const [search, setSearch] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false)


  const searchKeyword = async() => {
    setIsFirstTime(false);
    setIsLoading(true);
    console.log("Searching");
    fetch("http://192.168.56.1:3000/api/search/search-keyword", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ search: search })
      
    })
    
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
    setIsLoading(false);
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.subHeading}>Search</Text>
   
      
      <TextInput
          editable
          value={search}
          onChangeText={text => setSearch(text)}
          style={styles.input}
          placeholder="Search Poet"
          placeholderTextColor="white"
          keyboardType="default"
          />
      <TouchableOpacity onPress={searchKeyword} style={styles.button}>
     
     <Text style={styles.normalText}>
       
   Search
     </Text>
   </TouchableOpacity>
   <ActivityIndicator animating={isLoading} color={"#fff"} size={"large"}/>
   
   {
    isLoading==false&&verses.length==0&&isFirstTime==false?(
      <View>
      <Text style={styles.noVerseFound}>No Verse or Poet Found.</Text>
      </View>
    ):null
   }

   {
    isLoading==false&&verses.length!=0&&isFirstTime==false?(
      <Text style={styles.noVerseFound}>Search Results ({verses.length})</Text>
    ):null
   }

   {
        verses.map((verse, index)=> {
          return <Post poet={verse.poetName} verse={verse.verse} key={index}/>
        })
      }
      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,

    flex: 1,
    minHeight: 800,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#202632"

  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    borderRadius:20,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: "#804fcb",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  subHeading: {
    color: "#162447",
    fontSize: 18
  },
  noVerseFound: {
    color: "white",
    fontSize: 20,
    marginVertical: 20
  },
  normalText: {
    color: "white"
  }

});