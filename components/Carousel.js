import React, {useEffect, useState} from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PoetHome from './PoetHome';

function CarouselComponent() {

    const [allPoets, setAllPoets] = useState([]);

    useEffect(() => {
      getPoets();
    }, [])
    
    const getPoets = () => {
        fetch(`https://poetry-app-admin-panel.vercel.app/api/poets/get-poets`)
          .then(res => res.json())
          .then(data => {
            console.log(data.poets)
            setAllPoets(data.poets)
          
        })      
    }
    const width = Dimensions.get('window').width;
    const poets = ["جون ایلیاٰء", "مرزا غالب", "مصحفیء", "علامہ اقبال"]
    return (
        <View style={{ display: "flex", justifyContent:"center", alignItems: "center" }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={allPoets}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {
                    // console.log('current index:', index)
                }}
                renderItem={({ index }) => (
                   <PoetHome id={allPoets[index]._id} avatar={allPoets[index].avatar} poet={allPoets[index].poetName}/>
                )}
            />
        </View>
    );
}

export default CarouselComponent;