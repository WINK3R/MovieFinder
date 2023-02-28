import {Image, View} from "react-native";
import * as React from "react";


type StarsProps = {
    note: number
    size: number

}

export function Stars(props: StarsProps) {
    let imageSource;
    let note = props.note / 2;
    if (note < 0.5)
        imageSource = require('../assets/images/0.5stars_vote.png');
    else if (note < 1)
        imageSource = require('../assets/images/1stars_vote.png');
    else if (note < 1.5)
        imageSource = require('../assets/images/1.5stars_vote.png');
    else if (note < 2)
        imageSource = require('../assets/images/2stars_vote.png');
    else if (note < 2.5)
        imageSource = require('../assets/images/2.5stars_vote.png');
    else if (note < 3)
        imageSource = require('../assets/images/3stars_vote.png');
    else if (note < 3.5)
        imageSource = require('../assets/images/3.5stars_vote.png');
    else if (note < 4)
        imageSource = require('../assets/images/4stars_vote.png');
    else if (note < 4.5)
        imageSource = require('../assets/images/4.5stars_vote.png');
    else if (note < 5)
        imageSource = require('../assets/images/5stars_vote.png');

    return (
        <View>
            <Image source={imageSource} style={{
                width: props.size,
                height: 40,
                resizeMode: 'contain'
            }}/>
        </View>
    );
};

export default Stars;