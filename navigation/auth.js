import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Tab = createBottomTabNavigator();

export default function Tabs(){
return (
    <Tab.Navigator
    
    screenOptions={
        {
            "tabBarVisible": false,
            "tabBarStyle": { display: 'none' }
        }
    }
    >
        <Tab.Screen name="Login" component={ Login } options={{
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
                }}>Login</Text>
            </View>
           )
        }
        
        }}/> 
        <Tab.Screen name="Signup" component={ Signup } options={{
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
                }}>Signup</Text>
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