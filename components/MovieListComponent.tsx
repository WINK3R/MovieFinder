import Movie from "../model/Movie.js";
import {Image, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Stars from "./StarsComponent";
import * as React from "react";

type MovieListProps = {
    movie: Movie

}

export function MovieListComponent(props: MovieListProps) {
    function formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    const styles = StyleSheet.create({
        filmCard: {
            width: 70,
            height: 110,
            borderRadius: 8,
        },
        body: {
            height: 130,

            borderRadius: 20,
            justifyContent: "flex-start",
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 7,
            paddingHorizontal: 10,
            backgroundColor: "#1D1D1D",
            alignItems: "center",
            borderWidth: 1.5,
            borderColor: "#1F1F1F"
        },
        section: {
            height: 130,
            width: "85%",
            justifyContent: "center",
            flexDirection: 'column',
            paddingRight: 20,
            paddingLeft: 20,
        },
        h1: {
            color: "white",
            fontWeight: "700",
            fontSize: 21,
        },
        infoSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
        },
        top: {
            flexDirection: "row",
            alignItems: "center"
        },
        h3: {
            color: "grey",
            fontWeight: "600"
        },
        vote: {
            paddingLeft: 7,
            color: "white",
            fontWeight: "bold",
            fontSize: 13
        }
    });

    return (

        <LinearGradient style={styles.body} start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
            // Button Linear Gradient
                        colors={['#0B0B0B', '#1F1F1F']}>


            <Image
                style={styles.filmCard}
                source={{
                    uri: props.movie.poster_path_min,
                }}
            />
            <View style={styles.section}>
                <Text numberOfLines={1} style={styles.h1}>{props.movie.original_title}</Text>
                <View style={styles.infoSection}>
                    <View style={styles.top}>
                        <Stars note={props.movie.vote_average} size={90}></Stars>
                        <Text style={styles.vote}>{props.movie.vote_average.toFixed(1)}</Text>
                    </View>

                    <Text style={styles.h3}>{formatTime(props.movie.runtime)}</Text>
                </View>
                <Text numberOfLines={3} style={{color: "#C7C7C7", fontWeight: "600",}}>{props.movie.overview}</Text>

            </View>
        </LinearGradient>
    );
}