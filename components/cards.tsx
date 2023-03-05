import {Image, View} from "react-native";
import * as React from "react";

export function SuggestedCard() {


    return (
        <View>
            <Image style={{height: 28, width: 152, marginVertical: 5}}
                   source={require('../assets/images/suggested_card.png')}
            />
        </View>

    );
}

export function NewCard() {


    return (
        <View>
            <Image style={{height: 28, width: 99, marginVertical: 5}}
                   source={require('../assets/images/new_card.png')}
            />
        </View>
    );
}