import {Image, StyleSheet, Text, View} from "react-native";
import {BadgeFilm} from "../screens/HomeScreen";
import * as React from "react";


type ListWidgetProps = {
    imageURL : string
    name : String

}

const styles = StyleSheet.create({
    filmCard: {
        width: 70,
        height: 100,
        borderRadius: 8,


    },
});


export function ListWidget(props: ListWidgetProps) {
    return (
        <View style={{height: 100, borderRadius: 20, justifyContent: "flex-start", flexDirection: 'row', paddingHorizontal:20, marginVertical:5}} >
            <Image
                style={styles.filmCard}
                source={{
                    uri: 'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
                }}
            />
            <View style={{height: 100, borderRadius: 20, justifyContent: "flex-start", flexDirection: 'column', paddingLeft:10}} >
                <Text style={{color: "white", fontWeight:"bold", fontSize:25}}>{props.name}</Text>
                <Text style={{color: "grey", fontWeight:"bold", fontSize:17}}>{props.name}</Text>
                <View style={{marginVertical:10}}>
                    <BadgeFilm name={"Science-Ficton"}/>
                </View>
            </View>
        </View>


    );


}