import {Image, StyleSheet, Text, View} from "react-native";
import {BadgeFilm} from "../screens/HomeScreen";
import * as React from "react";


type ListWidgetProps = {
    imageURL: string
    name: String

    runtime: number

    director: string

}

const styles = StyleSheet.create({
    filmCard: {
        width: 70,
        height: 100,
        borderRadius: 8,


    },
});


export function ListWidget(props: ListWidgetProps) {

    function formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    return (
        <View style={{
            height: 100,
            borderRadius: 20,
            justifyContent: "flex-start",
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 5
        }}>
            <Image
                style={styles.filmCard}
                source={{
                    uri: props.imageURL,
                }}
            />
            <View style={{
                height: 100,
                borderRadius: 20,
                justifyContent: "flex-start",
                flexDirection: 'column',
                paddingLeft: 10
            }}>
                <Text numberOfLines={1} style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 25,
                    paddingRight: 50
                }}>{props.director}</Text>
                <Text style={{color: "grey", fontWeight: "bold", fontSize: 17}}>{formatTime(props.runtime)}</Text>
                <View style={{marginVertical: 10}}>
                    <BadgeFilm name={"Science-Ficton"}/>
                </View>
            </View>
        </View>


    );


}