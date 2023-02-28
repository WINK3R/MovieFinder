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
    // @ts-ignore
    const item: Movie = route.params.item
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
    const [credit, setCredit] = useState<creditItem[]>();
    const [paddingtopbackgroud, setpaddingtopbackgroud] = useState(0);
    const [opacitybackground, setopacitybackground] = useState(0.7);
    const [scalebackground, setscalebackground] = useState(1);
    const getTriller = async () => {
        const trailerResponse = (await fetch(config.base_url + "movie/" + item.id + "/videos?api_key=" + config.api_key + "&language=fr-FR"));

        const trailerJson = await trailerResponse.json();
        console.log("trailer", trailerJson)
        // @ts-ignore
        const trailer_key = trailerJson.results.slice(0, 1).map((elt) => {
            if (elt["type"] === "Trailer" && elt["site"] === "YouTube") {
                return elt["key"];
            }
        });
        console.log("key", trailer_key)
        setTrailerPath(trailer_key);
    }

    const getCredits = async () => {
        const creditResponse = (await fetch(config.base_url + "movie/" + item.id + "/credits?api_key=" + config.api_key + "&language=fr-FR"));

        const creditJson = await creditResponse.json();
        console.log("credittttttt", creditJson)
        // @ts-ignore
        let creditList = creditJson.cast.map((elt) => {
            if (elt["popularity"])
                return [elt["name"], 'https://image.tmdb.org/t/p/w500' + elt["profile_path"], elt["popularity"]]
        });
        creditList = creditList.slice(0, 5).sort((a: [fullname: string, profil_path: string, popularity: number], b: [fullname: string, profil_path: string, popularity: number]) => b[2] - a[2]);

        console.log("credit", creditList);
        setCredit(creditList);
    }

    const getSimilarMovies = async () => {
        const SimilarMoviesResponse = (await fetch(config.base_url + "movie/" + item.id + "/recommendations?api_key=" + config.api_key + "&language=fr-FR"));

        const SimilarMoviesJson = await SimilarMoviesResponse.json();
        // @ts-ignore
        const SimilarMoviesList = SimilarMoviesJson.results.slice(0, 10).map((elt) => {
            return new MinimalMovie(elt["original_title"], elt["poster_path"])
        });
        console.log("similar", SimilarMoviesList);
        setsimilarMovies(SimilarMoviesList);
    }
    const getReview = async () => {
        const ReviewResponse = (await fetch(config.base_url + "movie/" + item.id + "/reviews?api_key=" + config.api_key + "&language=us-EN&page=1"));

        const ReviewJson = await ReviewResponse.json();
        // @ts-ignore
        let ReviewList = ReviewJson.results.map((elt) => {
            const newreview = new Review(elt["content"], elt["author_details"].avatar_path, elt["created_at"], elt["author"])
            return newreview
        });
        ReviewList = ReviewList.filter((review: Review, index: number, array: Review[]) => {
            return array.findIndex((item: Review) => item.pseudo === review.pseudo) === index;
        });

        console.log("review", ReviewJson.results);
        setReview(ReviewList);
    }

    useEffect(() => {

        getReview();
        getTriller();
        getSimilarMovies();
        getCredits();
    }, []);

    function formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    type creditItem = [string, string, number];
    type creditProps = {
        data: creditItem[];
    };
    const handleScroll = (event: any) => {
        const {y} = event.nativeEvent.contentOffset;
        let padTop = y / -5;
        if (padTop <= 0)

            setpaddingtopbackgroud(y / -5);
        setopacitybackground(0.5 - y / 500);
        let scale = 1 - y / -1000
        if (scale >= 1)
            setscalebackground(scale);
    };


    function CreditList({data}: creditProps) {
        const renderItem = ({item}: { item: creditItem }) => (
            <View style={{width: 90, marginHorizontal: 7, alignItems: "center"}}>
                <View style={{justifyContent: "center"}}>
                    <Image source={{uri: item[1]}} style={{height: 90, width: 90, borderRadius: 200, borderWidth: 3, borderColor: "rgba(255,255,255,0.8)"}}></Image>
                    <View style={{backgroundColor: "white", borderRadius: 20, padding: 2, paddingHorizontal: 5, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, right: 0, flexDirection: "row"}}>
                        <Text style={{color: "black", fontWeight: "500", paddingRight: 4}}>{item[2].toFixed(1).toString()}</Text>
                        <Ionicons name="md-star" size={13} color="#FFC42D"/>
                    </View>
                </View>

                <Text numberOfLines={2} style={{color: "#DADADA", paddingTop: 5, fontWeight: "300"}}>{item[0]}</Text>
            </View>
        );

        return (
            <FlatList
                style={{paddingBottom: 40}}
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item[0]}
            />
        );
    }

    return (
        <View style={{backgroundColor: "#0E0E0E"}}>
            <View style={{height: "100%", width: "100%", position: "absolute"}}>
                <Image
                    style={{
                        height: "45%",
                        top: paddingtopbackgroud,
                        width: '100%',
                        opacity: opacitybackground,
                        position: "absolute",

                        transform: [{scale: scalebackground}],
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
                                colors={['rgba(14,14,14,0)', 'rgba(14,14,14,0.7)', 'rgba(14,14,14,1)', 'rgba(14,14,14,1)']}>
                </LinearGradient>
            </View>


            <SafeAreaView style={styles.background1}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex: 100}}>
                    <Ionicons name="ios-arrow-back" size={30} color="white" style={{position: "absolute", top: 10, left: 5}}/>
                </TouchableOpacity>
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={1}
                >
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

                    {credit !== undefined && (
                        <>
                            <Text style={{color: "#2998FD", paddingTop: 30, paddingBottom: 20, paddingLeft: 35, fontSize: 17, fontWeight: "600"}}>Crédits</Text>
                            <CreditList data={credit}></CreditList></>


                    )}
                    {similarMovies.length !== 0 && (
                        <>
                            <Text style={{color: "#2998FD", paddingTop: 30, paddingLeft: 35, fontSize: 17, fontWeight: "600"}}>Recommendations</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{paddingTop: 20}}
                                data={similarMovies}
                                horizontal={true}
                                keyExtractor={item => item.original_title}
                                renderItem={({item}) =>
                                    <View style={{width: 90, marginHorizontal: 7}}>
                                        <Image source={{uri: item.poster_path}} style={{height: 130, width: 90, borderRadius: 8}}></Image>
                                        <Text numberOfLines={2} style={{color: "#DADADA", paddingTop: 5, fontWeight: "300"}}>{item.original_title}</Text>
                                    </View>
                                }
                            /></>


                    )}

                    {review.length !== 0 && (
                        <>
                            <Text style={{color: "#2998FD", paddingTop: 30, paddingLeft: 35, fontSize: 17, fontWeight: "600"}}>Commentaires</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{paddingTop: 10}}
                                data={review}
                                horizontal={true}
                                keyExtractor={item => item.pseudo}
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