import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

import Homepage from "../screens/Homepage";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

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
                
                    backgroundColor: "#F95738",
                    height: 80,
                    ...styles.shadow
                }
            ]
        }
    }
    >
        <Tab.Screen name="Home" component={ Homepage } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/home.png")}
                style={{

                    width: 25,
                    height: 25,
                    tintColor: focused ? "white": "#162447"
                }}/>
                <Text style={{
                    color: focused ? "white": "#162447"
                }}>Home</Text>
            </View>
           )
        }
        
        }}/> 




        <Tab.Screen name="Feed" component={ Feed } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/home.png")}
                style={{

                    width: 26,
                    height: 26,
                    tintColor: focused ? "white": "#162447"
                }}/>
                <Text style={{
                    color: focused ? "white": "#162447"
                }}>Feed</Text>
            </View>
           )
        }
        
        }}/> 



        <Tab.Screen name="Search" component={ Search } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/home.png")}
                style={{

                    width: 26,
                    height: 26,
                    tintColor: focused ? "white": "#162447"
                }}/>
                <Text style={{
                    color: focused ? "white": "#162447"
                }}>Search</Text>
            </View>
           )
        }
        
        }}/> 
        <Tab.Screen name="Profile" component={ Profile } options={{
        tabBarIcon: ({focused})=> {
           return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../assets/icons/home.png")}
                style={{

                    width: 26,
                    height: 26,
                    tintColor: focused ? "white": "#162447"
                }}/>
                <Text style={{
                    color: focused ? "white": "#162447"
                }}>Profile</Text>
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