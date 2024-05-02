import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Post from "../components/Post"
import { useEffect, useState } from 'react';
export default function Feed() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setIsNewLoading] = useState(true);

  const [allPosts, setAllPosts] = useState([]);

  const [isMore, setIsMore] = useState(true)

  const [page, setPage] = useState(1);
  const [verses, setVerses] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const getVerses = async() => {
    setIsNewLoading(true)
    console.log("Wait");

   
    fetch(`https://poetry-app-admin-panel.vercel.app/api/verses/get-verses-infinite`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({page: page})
    })
    .then(res => res.json())
    .then(data => {
      
      // console.log(`Expression: ${allPosts.length+data.posts.length} - ${totalPosts}`)
      setTotalPosts(data.verseLength)
      let len = data.verses.length;
      setCurrentPosts(currentPosts+len)

    setAllPosts((prevPosts) => [...prevPosts, ...data.verses])

    if (allPosts.length+data.verses.length == totalPosts) {
      setIsMore(false)
    }
    else {
      setIsMore(true)
    }
    setPage(page + 1);

    setIsLoading(false)
    setIsNewLoading(false)
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
        allPosts.map((verse, index)=> {
          return <Post poetData={verse.poet} likes={verse.likes} verseId={verse._id} poet={verse.poetName} verse={verse.verse} key={index}/>
        })
      }

      
    {
      isNewLoading?(
<Text style={styles.normalText} >Loading</Text>
      ):null
    }

    {
  isLoading==false&&allPosts.length!==totalPosts?(
    <TouchableOpacity onPress={getVerses} style={[styles.button, {
      marginVertical: 50
    }]} ><Text style={styles.normalText}>Load More...</Text></TouchableOpacity>
   
  ):null
}

 {
   isLoading==false&&allPosts.length==totalPosts?(
    <>
     <Text style={{marginVertical:50, color: "white"}}>You have seen all verses 👏</Text>
     
    </>
     ):null
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