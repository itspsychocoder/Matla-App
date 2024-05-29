import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import SinglePost from "../components/SinglePost"
import { BackHandler } from 'react-native';
import { StyleSheet, Image, TextInput,Text, Alert, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import useUserStore from "../store/store";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useFonts } from 'expo-font';
import Post from "../components/Post"
import Toast from 'react-native-root-toast';

export default function Search({navigation}) {
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const userId = useUserStore((state) => state.userId);
  const poetId = useUserStore((state) => state.poetId);

  const screen = useUserStore((state) => state.screen);


  const [verse, setVerse] = useState({});
  const [inputText, setInputText] = useState('Test');
  const [imageUri, setImageUri] = useState(null);


  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setIsNewLoading] = useState(true);

  const [allPosts, setAllPosts] = useState([]);

  const [isMore, setIsMore] = useState(true)

  const [page, setPage] = useState(1);
  const [verses, setVerses] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const [isLoaded] = useFonts({
    test: require("../assets/fonts/urdu-font.ttf"),
  });
  const getVerses = async() => {
    setIsNewLoading(true)
    console.log("Wait");

   
    fetch(`https://poetry-app-admin-panel.vercel.app/api/verses/get-poet-verses-infinite`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({page: page, poetId: poetId})
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

  
    searchKeyword();
    getVerses();
    const backAction = () => {
      setIsSingleVerse(false)
      // Handle your back button press logic here
      // For example, navigate back to previous screen, show an alert, etc.
      // Return true to prevent the default back button behavior (exit the app)
      // Return false to allow the default back button behavior (navigate back)
      
      // Example:
      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      // return true; // Prevent default back button behavior
      return false; // Allow default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);



  const [poet, setPoet] = useState({});
  const [search, setSearch] = useState("");
  const [isFollow, setIsFollow] = useState(false)
  const followPoet = async() => {
   console.log(userId, poetId);

    setIsLoading(true);
    fetch("https://poetry-app-admin-panel.vercel.app/api/follow/follow-poet", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ poetId: poetId, userId: userId })
      
    })
    
    .then(res => res.json())
    .then(data => {
      console.log(data)
     Toast.show(data.message);
     if(data.type == "success") {
      setIsFollow(true)
     }
    })
    .catch(error => {
      console.log(error)
    })
    setIsLoading(false);
  }

  const searchKeyword = async() => {
    setIsLoading(true);
    console.log("Finding Single Verse", poetId);
    fetch("https://poetry-app-admin-panel.vercel.app/api/poets/get-single-poet", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ poetId: poetId })
      
    })
    
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.type == "success") {
        console.log(data.poet)
        setPoet(data.poet)
        setVerses(data.verses);
        setIsFollow(data.poet.followers.includes(userId))
      }
    })
    .catch(error => {
      console.log(error)
    })
    setIsLoading(false);
  }
  return (
    <ScrollView>
    <View style={styles.container} >

<View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
  <View >

  <Image
   style={styles.avatar}
  source={{uri: poet.avatar}}/>
  </View>
  

 

  <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

 <View style={{display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: "center"}}>
 <Text style={{color: "white",fontFamily: 'test',fontSize: 35, marginHorizontal: 10}}>

{poet.poetName}
</Text>


<Image
style={styles.tick}
source={require("../assets/icons/tick-icon.png")}/>
 </View>

  <View>
  
  </View>

  
  </View>

  <Text style={styles.bio}>
  {poet.bio}
  </Text>
  </View>

      
 {/* <TouchableOpacity onPress={searchKeyword}>
  <Text>Fetch</Text>
 </TouchableOpacity> */}

 <View style={{marginHorizontal:10,width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row"}}>
  <View>
    <Text style={styles.follower}>{poet.followers?.length} Followers</Text>
  </View>


  <View>
    <Text style={styles.follower}>{poet.followers?.length} Verses</Text>
  </View>


  <View>
  {isFollow?(
      <TouchableOpacity onPress={followPoet} style={styles.followBtn}>
      <Text style={{fontSize: 20, color: "white"}}>
      Unfollow
      </Text>
     </TouchableOpacity>
 
    ):(
      <TouchableOpacity onPress={followPoet} style={styles.followBtn}>
  <Text style={{fontSize: 20, color: "white"}}>
  Follow
  </Text>
 </TouchableOpacity>
    )
   }
  </View>
 </View>


 

 <Text>

  </Text>

 {/* <Text style={styles.heading}>Poet Info</Text> */}

 <View >
  <View style={{width: "100%",display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
    <Text style={styles.follower}>Date of Birth</Text>
    <Text style={styles.follower}>{poet.dateOfBirth}</Text>
  </View>


  <View style={{marginVertical: 20,width: "100%",display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
    <Text style={styles.follower}>Location</Text>
    <Text style={styles.follower}>{poet.dateOfBirth}</Text>
  </View>

  <View style={{width: "100%",display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
    <Text style={styles.follower}>Category</Text>
    <Text style={styles.follower}>{poet.dateOfBirth}</Text>
  </View>

 </View>


 {
        allPosts.map((verse, index)=> {
          return <Post poetData={verse.poet} likes={verse.likes} verseId={verse._id} poet={verse.poetName} verse={verse.verse} key={index}/>
        })
      }


      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  bio: {
    color: "white",
    fontSize: 18,
    marginVertical:10,
    fontFamily: "test",
    textAlign: "center",
    marginHorizontal:50
  },
  heading: {

    fontSize: 25,
    color: "white",
    marginVertical: 20
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  miniCard: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {
    fontSize: 50,
    fontWeight: "bold"
  },
  miniNumber: {
    fontSize: 30,
    fontWeight: "bold"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"

  },
  miniTitle: {
    fontSize: 15,
    fontWeight: "bold"

  },
  followBtn: {
    marginVertical: 20,
    color: "white",
    fontSize: 20,
    backgroundColor: "#2081C3",
    width: "140%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10

  },
  container: {
    paddingVertical: 70,

    flex: 1,
    minHeight: 900,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#011627",

  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginHorizontal: 10,
  },
  tick: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: "orange",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  subHeading: {
    fontSize: 18
  },
  noVerseFound: {
    color: "white",
    fontSize: 20,
    marginVertical: 20
  },
  follower: {
    fontSize: 22,
    color: "white"
  }

});