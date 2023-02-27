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
    ActivityIndicator, FlatList, TouchableHighlight
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
import MinimalMovie from "../model/MinimalMovie";
import {ListWidget} from "./WatchLaterScreen";
import Review from "../model/review";

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
    const [similarMovies, setsimilarMovies] = useState<MinimalMovie[]>([]);
    const [review, setReview] = useState<Review[]>([]);
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

    const getSimilarMovies = async () => {
        const SimilarMoviesResponse = (await fetch(config.base_url + "movie/" + item.id + "/recommendations?api_key=" + config.api_key + "&language=fr-FR"));

        const SimilarMoviesJson = await SimilarMoviesResponse.json();
        const SimilarMoviesList = SimilarMoviesJson.results.slice(0, 10).map((elt) => {
            return new MinimalMovie(elt["original_title"], elt["poster_path"])
        });
        console.log("similar", SimilarMoviesList);
        setsimilarMovies(SimilarMoviesList);
    }
    const getReview = async () => {
        const ReviewResponse = (await fetch(config.base_url + "movie/" + item.id + "/reviews?api_key=" + config.api_key + "&language=us-EN&page=1"));

        const ReviewJson = await ReviewResponse.json();
        const ReviewList = ReviewJson.results.map((elt) => {

            return new Review(elt["content"], elt["author_details"].avatar_path, elt["created_at"], elt["author"])
        });
        console.log("review", ReviewList);
        setReview(ReviewList);
    }

    useEffect(() => {

        getReview();
        getTriller();
        getSimilarMovies();
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
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                    <View style={{paddingHorizontal: 35}}>
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


                    {similarMovies.length !== 0 && (
                        <>
                            <Text style={{color: "white", paddingTop: 30, paddingLeft: 35, fontSize: 17, fontWeight: "800"}}>Recommandations</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{paddingTop: 20}}
                                data={similarMovies}
                                horizontal={true}
                                keyExtractor={item => item.original_title}
                                renderItem={({item}) =>
                                    <View style={{width: 90, marginHorizontal: 7}}>
                                        <Image source={{uri: item.poster_path}} style={{height: 130, width: 90, borderRadius: 8}}></Image>
                                        <Text numberOfLines={2} style={{color: "white", paddingTop: 5, fontWeight: "200"}}>{item.original_title}</Text>
                                    </View>
                                }
                            /></>


                    )}
                    {review.length !== 0 && (
                        <>
                            <Text style={{color: "white", paddingTop: 30, paddingLeft: 35, fontSize: 17, fontWeight: "800"}}>Commentaires</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{paddingTop: 10}}
                                data={review}
                                horizontal={true}
                                keyExtractor={item => item.profil_path}
                                renderItem={({item}) =>
                                    <View style={{marginHorizontal: 7, width: 300, padding: 20, backgroundColor: "#09090F", marginVertical: 10, borderRadius: 14, borderWidth: 0.8, borderColor: "rgba(223,223,223,0.14)"}}>

                                        <View style={{flexDirection: "row", paddingBottom: 20}}>
                                            <Image source={{uri: item.profil_path}} style={{height: 50, width: 50, borderRadius: 100}}></Image>
                                            <View style={{paddingLeft: 10, flexDirection: "row", justifyContent: "space-between", width: "80%", alignItems: "center"}}>
                                                <Text numberOfLines={1} style={{color: "white", paddingTop: 5, fontWeight: "700", fontSize: 16}}>{item.pseudo}</Text>
                                                <Text style={{color: "grey", paddingTop: 5, fontWeight: "500", fontSize: 14}}>{item.date}</Text>
                                            </View>
                                        </View>


                                        <Text numberOfLines={15} style={{color: "#B3B3B3", paddingTop: 5, fontWeight: "400"}}>{item.message}</Text>
                                    </View>
                                }
                            /></>


                    )}


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