import * as React from 'react';
import {
    Button,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    SafeAreaView,
    ActivityIndicator, FlatList
} from 'react-native';
import {RootStackScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import Movie from "../model/Movie";

import {LinearGradient} from 'expo-linear-gradient';
import {Stars} from "./HomeScreen";
import {useEffect, useState} from "react";
import config from "../constants/config";
import YoutubeIframe from "react-native-youtube-iframe";
import Icon from "react-native-ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function InfoScreen({navigation, route}: RootStackScreenProps<'Info'>) {
    const item: Movie = route.params.item
    console.log("current", item);
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        background1: {
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
        },
    });
    const [trailerPath, setTrailerPath] = useState("");
    const getTriller = async () => {
        const trailerResponse = (await fetch(config.base_url + "movie/" + item.id + "/videos?api_key=" + config.api_key + "&language=fr-FR"));

        const trailerJson = await trailerResponse.json();
        console.log("trailer", trailerJson)
        const trailer_key = trailerJson.results.slice(0, 1).map((elt) => {
            if (elt["type"] === "Trailer" && elt["site"] === "YouTube") {
                return elt["key"];
            }
        });
        console.log("key", trailer_key)
        setTrailerPath(trailer_key);
    }

    useEffect(() => {


        getTriller();
    }, []);

    function formatTime(time: number) {
        console.log(time);
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }


    return (
        <View style={{backgroundColor: "#0F0F19"}}>
            <View style={{height: "100%", width: "100%", position: "absolute"}}>
                <Image
                    style={{
                        height: "45%",
                        width: '100%',
                        opacity: 0.5,
                        position: "absolute"
                    }}
                    source={{
                        uri: item.backdrop_path,
                    }}
                ></Image>

                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                />
                <LinearGradient style={{height: "30%", top: "25%",}}
                    // Button Linear Gradient
                                colors={['rgba(15,15,25,0)', 'rgba(15,15,25,0.7)', 'rgba(15,15,25,1)', 'rgba(15,15,25,1)']}>
                </LinearGradient>
            </View>


            <SafeAreaView style={styles.background1}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex: 100}}>
                    <Ionicons name="ios-arrow-back" size={30} color="white" style={{position: "absolute", top: 10, left: 10}}/>
                </TouchableOpacity>
                <ScrollView style={{paddingHorizontal: 35, height: "100%"}}>
                    <View>
                        <Text style={{color: "white", fontSize: 43, fontWeight: "bold", paddingBottom: 10, paddingTop: "45%"}} numberOfLines={2}>{item.original_title}</Text>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
                            <InfoBadge texte={`${item.genres[0]} ${item.genres[1] !== undefined ? ", " + item.genres[1] : ""}`}></InfoBadge>
                            <InfoBadge texte={item.release_date}></InfoBadge>
                            <InfoBadge texte={formatTime(item.runtime)}></InfoBadge>
                        </View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "flex-start", alignItems: "center", paddingBottom: 30}}>
                            <Stars note={item.vote_average} size={120}></Stars>
                            <Text style={{color: "#FFC42D", fontWeight: "bold", paddingLeft: 10, fontSize: 16}}>{item.vote_average.toFixed(1)}</Text>

                        </View>
                        {trailerPath !== "" && (

                            <YoutubeIframe webViewStyle={{borderRadius: 10, overflow: "hidden"}}

                                           height={195}
                                           play={false}
                                           videoId={trailerPath}

                            />)}


                        <Text style={{color: "#B3B3B3", paddingTop: 30, fontSize: 17}}>{item.overview}</Text>


                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
type InfoBadgeProps = {
    texte: string

}

export function InfoBadge(props: InfoBadgeProps) {
    return (<View style={{paddingHorizontal: 15, paddingVertical: 7, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, justifyContent: "center", marginRight: 10}}>
        <Text style={{color: "white", fontSize: 15}}>{props.texte}</Text>
    </View>);
}