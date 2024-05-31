import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Post from "../components/Post";
import { useEffect, useState } from "react";
export default function Feed() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setIsNewLoading] = useState(true);

  const [currentFeed, setCurrentFeed] = useState("Following");

  const [allPosts, setAllPosts] = useState([]);

  const [isMore, setIsMore] = useState(true);

  const [page, setPage] = useState(1);
  const [verses, setVerses] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  const [allFollowedPosts, setAllFollowedPosts] = useState([]);

  const [isFollowedMore, setIsFollowedMore] = useState(true);

  const [followedPage, setFollowedPage] = useState(1);
  const [followedVerses, setFollowedVerses] = useState([]);
  const [totalFollowedPosts, setTotalFollowedPosts] = useState(0);
  const [currentFollowedPosts, setCurrentFollowedPosts] = useState(0);
  const getVerses = async () => {
    setIsNewLoading(true);
    console.log("Wait");

    fetch(
      `https://poetry-app-admin-panel.vercel.app/api/verses/get-verses-infinite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: page }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(`Expression: ${allPosts.length+data.posts.length} - ${totalPosts}`)
        setTotalPosts(data.verseLength);
        let len = data.verses.length;
        setCurrentPosts(currentPosts + len);

        setAllPosts((prevPosts) => [...prevPosts, ...data.verses]);

        if (allPosts.length + data.verses.length == totalPosts) {
          setIsMore(false);
        } else {
          setIsMore(true);
        }
        setPage(page + 1);

        setIsLoading(false);
        setIsNewLoading(false);
      });
  };
  const getFollowedVerses = async () => {
    setIsNewLoading(true);
    console.log("Wait");

    fetch(
      `https://poetry-app-admin-panel.vercel.app/api/verses/get-verses-infinite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: followedPage }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(`Expression: ${allPosts.length+data.posts.length} - ${totalPosts}`)
        setTotalFollowedPosts(data.verseLength);
        let len = data.verses.length;
        setCurrentFollowedPosts(currentFollowedPosts + len);

        setAllFollowedPosts((prevPosts) => [...prevPosts, ...data.verses]);

        if (allPosts.length + data.verses.length == totalPosts) {
          setIsFollowedMore(false);
        } else {
          setIsFollowedMore(true);
        }
        setFollowedPage(page + 1);

        setIsLoading(false);
        setIsNewLoading(false);
      });
  };
 

  useEffect(() => {
    getVerses();
    getFollowedVerses();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text style={styles.subHeading}>Feed</Text>
          <TouchableOpacity onPress={getVerses} style={styles.button}>
            <Text style={styles.normalText}>Reload</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            width: 250,
            marginVertical: 40,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentFeed("Following");
            }}
          >
            <Text
              style={{
                borderBottom: currentFeed == "Following" ? 2 : 0,
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderColor: currentFeed == "Following" ? "white" : "",
                borderBottomWidth: currentFeed == "Following" ? 2 : 0,
              }}
            >
              Following
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCurrentFeed("For You");
            }}
          >
            <Text
              style={{
                borderBottom: currentFeed != "Following" ? 2 : 0,
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderColor: currentFeed != "Following" ? "white" : "",
                borderBottomWidth: currentFeed != "Following" ? 2 : 0,
              }}
            >
              For You
            </Text>
          </TouchableOpacity>
        </View>

        {currentFeed != "Following" ? (
          <View>
            {allPosts.map((verse, index) => {
              return (
                <Post
                  poetData={verse.poet}
                  likes={verse.likes}
                  verseId={verse._id}
                  poet={verse.poetName}
                  verse={verse.verse}
                  key={index}
                />
              );
            })}

            {isNewLoading ? (
              <ActivityIndicator
                style={{ marginVertical: 20 }}
                animating={isNewLoading}
                color={"#fff"}
                size={"large"}
              />
            ) : null}

            {isLoading == false && allPosts.length !== totalPosts ? (
              <TouchableOpacity
                onPress={getVerses}
                style={[
                  styles.button,
                  {
                    marginVertical: 50,
                  },
                ]}
              >
                <Text style={styles.normalText}>Load More...</Text>
              </TouchableOpacity>
            ) : null}

            {isLoading ? (
              <ActivityIndicator
                style={{ marginVertical: 20 }}
                animating={isLoading}
                color={"#fff"}
                size={"large"}
              />
            ) : null}

            {isLoading == false && allPosts.length == totalPosts ? (
              <>
                <Text style={{ marginVertical: 50, color: "white" }}>
                  You have seen all verses 👏
                </Text>
              </>
            ) : null}
          </View>
        ) : (
          <View>
            {/* Following start here */}
            {allFollowedPosts.map((verse, index) => {
              return (
                <Post
                  poetData={verse.poet}
                  likes={verse.likes}
                  verseId={verse._id}
                  poet={verse.poetName}
                  verse={verse.verse}
                  key={index}
                />
              );
            })}

            {isNewLoading ? (
              <ActivityIndicator
                style={{ marginVertical: 20 }}
                animating={isNewLoading}
                color={"#fff"}
                size={"large"}
              />
            ) : null}

            {isLoading == false && allFollowedPosts.length !== totalFollowedPosts ? (
              <TouchableOpacity
                onPress={getFollowedVerses}
                style={[
                  styles.button,
                  {
                    marginVertical: 50,
                  },
                ]}
              >
                <Text style={styles.normalText}>Load More...</Text>
              </TouchableOpacity>
            ) : null}

            {isLoading ? (
              <ActivityIndicator
                style={{ marginVertical: 20 }}
                animating={isLoading}
                color={"#fff"}
                size={"large"}
              />
            ) : null}

            {isLoading == false && allFollowedPosts.length == totalFollowedPosts ? (
              <>
                <Text style={{ marginVertical: 50, color: "white" }}>
                  You have seen all verses 👏
                </Text>
              </>
            ) : null}
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: "#0d0d15",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 800,
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  button: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "#5dbb27",
    // 347a15
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  subHeading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  normalText: {
    color: "white",
  },
});
