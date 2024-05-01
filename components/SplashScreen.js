import React from 'react'
import { View, Text, Image } from 'react-native'

function SplashScreen() {
  return (
    <View style={{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    backgroundColor: '#202632',

    }}>
<View>

<Text style={{fontWeight: "bold", fontSize: 20}}>

</Text>
</View>

<View style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
<Image style={{width: 150, height: 150, marginVertical: 10, borderRadius: 20}} source={require("../assets/profile.jpg")} alt='Profile Image'/>

<Text style={{color: "white",fontWeight: "bold", fontSize: 30}}>
Matla

</Text>
</View>

<View>

    <Text style={{color: "white", marginVertical: 30,fontWeight: "bold", fontSize: 20}}>
Created by: Psycho Coders

</Text>
    </View>
        </View>
  )
}

export default SplashScreen