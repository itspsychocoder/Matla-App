import * as React from 'react';
import { Dimensions, StyleSheet, Image, Text, View } from 'react-native';
import { useCallback, useEffect, useState, useRef } from "react";
import { useFonts } from "expo-font";
import { TouchableOpacity } from 'react-native';
import useUserStore from '../store/store';
function PoetHome({poet, avatar, id}) {
  const setIsSingleVerse = useUserStore((state) => state.setIsSingleVerse);
  const setPoetId = useUserStore((state) => state.setPoetId);

    const [isLoaded] = useFonts({
        test: require("../assets/fonts/urdu-font.ttf"),
      });
      useEffect(() => {
   handleOnLayout();
      }, []);
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
        <TouchableOpacity onPress={()=>{
          setPoetId(id);
          setIsSingleVerse(true);
        }} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>

        <View style={styles.box}>
           <Image
            style={styles.avatar}
            source={{uri: avatar}}
            alt="Profile Image"
            />
            <Text style={[styles.poet, { fontFamily: "test", fontSize: 22 }]}>
{poet}
            </Text>
        </View>
            </TouchableOpacity>
    );
}

export default PoetHome;

const styles = StyleSheet.create({
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginVertical: 20,
    },
    poet: {
        fontSize: 20
    },
    box: {
        marginVertical: 20,
        width: "60%",
        shadowColor: "white",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
     
        
    
        backgroundColor: "#F8F4E3",
        textAlign: "center",
        padding: 20,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
  });
  