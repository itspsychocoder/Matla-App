import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PoetHome from './PoetHome';
function CarouselComponent() {
    const width = Dimensions.get('window').width;
    const poets = ["جون ایلیاٰء", "مرزا غالب", "مصحفیء", "علامہ اقبال"]
    return (
        <View style={{ display: "flex", justifyContent:"center", alignItems: "center" }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={["جون ایلیاٰء", "مرزا غالب", "مصحفیء", "علامہ اقبال"]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                   <PoetHome poet={poets[index]}/>
                )}
            />
        </View>
    );
}

export default CarouselComponent;