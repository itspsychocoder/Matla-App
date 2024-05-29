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
    const res = await fetch("https://poetry-app-admin-panel.vercel.app/api/search/search-keyword", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ search: search })
      
    })

    const result = await res.json();
    
    
      console.log(result.verses)
      if (result.type == "success") {
        setVerses(result.verses)
     
      }
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
   <ActivityIndicator style={{marginVertical:20}} animating={isLoading} color={"#fff"} size={"large"}/>
  
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
          return  <Post poetData={verse.poet} likes={verse.likes} verseId={verse._id} poet={verse.poetName} verse={verse.verse} key={index}/>
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
    backgroundColor: "#0d0d15"

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
    backgroundColor: "#5dbb27",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  subHeading: {
    color: "white",
    fontSize:25
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