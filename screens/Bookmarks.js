import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Post from "../components/Post"

import { StyleSheet, TextInput,Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import useUserStore from '../store/store';

export default function Search() {
  const {username, userId} = useUserStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const getBookmarks = async() => {
    const dataa = {
      username: userId
    }
    console.log("Sending bookmark request with: ", username)
    const res = await fetch(`https://poetry-app-admin-panel.vercel.app/api/bookmarks/get-bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataa),
    })

    const data = await res.json();

    console.log(data)
    setBookmarks(data.bookmarks)
  }

  useEffect(() => {
    getBookmarks();
  }, [])
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.subHeading}>Bookmarks</Text>

      <TouchableOpacity onPress={getBookmarks}>
        <Text>Run</Text>
      </TouchableOpacity>
 

  

   {
        bookmarks.map((verse, index)=> {
          return  <Post poetData={verse.verseId.poet} likes={verse.verseId.likes} verseId={verse.verseId._id} poet={verse.verseId.poetName} verse={verse.verseId.verse} key={index}/>
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
    minHeight: 1000,
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