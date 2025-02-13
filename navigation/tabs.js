import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

import Homepage from "../screens/Homepage";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Bookmarks from "../screens/Bookmarks";
import SingleVerse from "../screens/SingleVerse"
const Tab = createBottomTabNavigator();

export default function Tabs(){
return (
    <Tab.Navigator
    screenOptions={
        {
            "tabBarShowLabel": false,
            "showIcon": true,
            "activeTintColor": "#e32f45",
            "inactiveTintColor": "#748c94",
            "tabBarStyle": [
                {
                    position: "absolute",
                   
                    elevation: 0,
                    margin:20,
                    borderRadius:20,
                    paddingVertical: 10,
                
                    backgroundColor: "#5dbb27",
                    height: 60,
                    ...styles.shadow
                }
            ]
        }
    }
    >
        <Tab.Screen name="Home" component={ Homepage } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{borderBottomWidth:focused?3:0,
                borderColor: "white",
                paddingBottom:5,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/home.png")}
                style={{

                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FCFCFC": "#e3e3e3"
                }}/>
                {/* <Text style={{
                    color: focused ? "#FCFCFC": "#e3e3e3"
                }}>Home</Text> */}
            </View>
           )
        }
        
        }}/> 




        <Tab.Screen name="Feed" component={ Feed } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{borderBottomWidth:focused?3:0,
                borderColor: "white",
                paddingBottom:5,display: "flex",justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/feed.png")}
                style={{

                    width: 26,
                    height: 26,
                    tintColor: focused ? "#FCFCFC": "#e3e3e3"
                }}/>
                {/* <Text style={{
                    color: focused ? "#FCFCFC": "#e3e3e3"
                }}>Feed</Text> */}
            </View>
           )
        }
        
        }}/> 



        <Tab.Screen name="Search" component={ Search } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{
                borderBottomWidth:focused?3:0,
                borderColor: "white",
                paddingBottom:5,
                justifyContent: 'center', alignItems: 'center'}}>
                
                <Image source={require("../assets/icons/search.png")}
                style={{

                    width: 26,
                    height: 26,
                    tintColor: focused ? "#FCFCFC": "#e3e3e3"
                }}/>
                {/* <Text style={{
                    color: focused ? "#FCFCFC": "#e3e3e3"
                }}>Search</Text> */}
               
            </View>
           )
        }
        
        }}/> 
        <Tab.Screen name="Profile" component={ Profile } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{borderBottomWidth:focused?3:0,
                borderColor: "white",
                paddingBottom:5,justifyContent: 'center', alignItems: 'center'}}>
                {
                    focused?(
                        <Image source={require("../assets/icons/profile-focused.png")}
                        style={{

                            width: 26,
                            height: 26,
                            tintColor: focused ? "#FCFCFC": "#e3e3e3"
                        }}/>
                    ):(
                        <Image source={require("../assets/icons/profile.png")}
                        style={{

                            width: 26,
                            height: 26,
                            tintColor: focused ? "#FCFCFC": "#e3e3e3"
                        }}/>
                    )
                }
               
                {/* <Text style={{
                    color: focused ? "#FCFCFC": "#e3e3e3"
                }}>Profile</Text> */}
            </View>
           )
        }
        
        }}/> 



    </Tab.Navigator>
)
}



const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})