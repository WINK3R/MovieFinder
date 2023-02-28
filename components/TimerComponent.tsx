import {Image, Text, View} from "react-native";
import * as React from "react";

type TimerProps = {
    hours: number
    minutes: number
    seconds: number

}

export function Timer(props: TimerProps) {
    return (
        <View style={{zIndex: 1, alignContent: "center", justifyContent: "center", flex: 0.15, flexDirection: "row"}}>
            <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>Nouvelle collection dans</Text>
            <Image source={require('../assets/images/timer_icon.png')} style={{
                height: 30,
                resizeMode: 'contain',
                top: -5
            }}></Image>
            <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${props.hours.toString().padStart(2, '0')}:`}</Text>
            <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${props.minutes.toString().padStart(2, '0')}:`}</Text>
            <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${props.seconds.toString().padStart(2, '0')}`}</Text>
        </View>

    );
}

export function Timer2(props: TimerProps) {
    return (
        <View style={{zIndex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, flexDirection: "row", bottom: 0, backgroundColor: "white", marginTop: 50}}>
            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>Nouvelle collection dans</Text>
            <Image source={require('../assets/images/timer_icon2.png')} style={{
                height: 30,
                resizeMode: 'contain', marginHorizontal: 7

            }}></Image>

            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${props.hours.toString().padStart(2, '0')}:`}</Text>
            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${props.minutes.toString().padStart(2, '0')}:`}</Text>
            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${props.seconds.toString().padStart(2, '0')}`}</Text>
        </View>

    );
}