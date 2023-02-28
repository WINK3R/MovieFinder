import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import Stars from "./StarsComponent";
import Movie from "../model/Movie";

type headerMovieProps = {
    movie: Movie

}

export function HeaderMovie(props: headerMovieProps) {
    
    function formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    const styles = StyleSheet.create({
        circle: {
            width: 6,
            height: 6,
            borderRadius: 100 / 2,
            marginTop: 4,
            backgroundColor: "lightgray",
            marginHorizontal: 8
        },
    });

    return (<View style={{flexDirection: 'column', alignSelf: 'center', paddingHorizontal: 30, width: '100%', alignItems: "center", paddingTop: 10, flex: 0.07}}>
        <Text numberOfLines={1} style={{color: "white", fontSize: 30, fontWeight: "bold", paddingTop: 5, alignSelf: "center"}}>{props.movie.original_title}</Text>
        <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${props.movie.release_date}`}</Text>
            <View style={styles.circle}/>
            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${props.movie.genres[0]} ${props.movie.genres[1] !== undefined ? ", " + props.movie.genres[1] : ""}`}</Text>
            <View style={styles.circle}/>
            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${formatTime(props.movie.runtime)}`}</Text>
        </View>
        <Stars note={props.movie.vote_average} size={110}/>
    </View>);
}
