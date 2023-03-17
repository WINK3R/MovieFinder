import * as React from 'react';
import {TouchableOpacity, ScrollView, View, Text, StyleSheet, Image, SafeAreaView, FlatList} from 'react-native';
import {RootStackScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Movie from "../model/Movie";
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect, useState} from "react";
import config from "../constants/config";
import YoutubeIframe from "react-native-youtube-iframe";
import Ionicons from "@expo/vector-icons/Ionicons";
import MinimalMovie from "../model/MinimalMovie";
import Review from "../model/review";
import Stars from "../components/StarsComponent";
import {formatTime} from "../model/formatTime";

export default function InfoScreen({navigation, route}: RootStackScreenProps<'Info'>) {
    // @ts-ignore
    const item: Movie = route.params.item

    const insets = useSafeAreaInsets();

    const [trailerPath, setTrailerPath] = useState("");

    const [similarMovies, setSimilarMovies] = useState<MinimalMovie[]>([]);

    const [review, setReview] = useState<Review[]>([]);

    const [credit, setCredit] = useState<creditItem[]>();

    const [paddingTopBackground, setPaddingTopBackground] = useState(0);

    const [opacityBackground, setOpacityBackground] = useState(0.7);

    const [scaleBackground, setScaleBackground] = useState(1);


    const handleScroll = (event: any) => {
        const {y} = event.nativeEvent.contentOffset;
        let padTop = y / -20;
        if (padTop <= 0)
            setPaddingTopBackground(padTop);
        setOpacityBackground(0.5 - y / 600);
        let scale = 1 - y / -2000
        if (scale >= 1)
            setScaleBackground(scale);
    };

    type creditItem = [string, string, number];

    type creditProps = {
        data: creditItem[];
    };

    function CreditList({data}: creditProps) {
        const renderItem = ({item}: { item: creditItem }) => (
            <View style={styles.creditContainer}>
                <View style={styles.bubble}>
                    <Image source={{uri: item[1]}} style={styles.photo}></Image>
                    <View style={styles.popularityDot}>
                        <Text style={styles.popularityLabel}>{item[2].toFixed(1).toString()}</Text>
                        <Ionicons name="md-star" size={13} color="#FFC42D"/>
                    </View>
                </View>

                <Text numberOfLines={2} style={styles.creditName}>{item[0]}</Text>
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

    type SimilarMovieProps = {
        movie: MinimalMovie;
    };

    function SimilarMovie(props: SimilarMovieProps) {
        return (
            <View style={styles.similarContainer}>
                <Image source={{uri: props.movie.poster_path}} style={styles.similarPoster}></Image>
                <Text numberOfLines={2} style={styles.similarTitleFilm}>{props.movie.original_title}</Text>
            </View>
        );
    }

    type ReviewProps = {
        review: Review;
    };

    function ReviewComponent(props: ReviewProps) {
        return (
            <View style={styles.reviewContainer}>

                <View style={styles.reviewInfo}>
                    <Image source={{uri: props.review.profile_path}} style={styles.imageProfile}></Image>
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={1} style={styles.pseudo}>{props.review.pseudo}</Text>
                        <Text style={styles.date}>{props.review.date}</Text>
                    </View>
                </View>


                <Text numberOfLines={15} style={styles.message}>{props.review.message}</Text>
            </View>
        );
    }

    type InfoBadgeProps = {
        texte: string

    }

    function InfoBadge(props: InfoBadgeProps) {
        return (<View style={{paddingHorizontal: 15, paddingVertical: 7, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, justifyContent: "center", marginRight: 10}}>
            <Text style={{color: "white", fontSize: 15}}>{props.texte}</Text>
        </View>);
    }

    const styles = StyleSheet.create({
        background1: {
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
        },
        body: {
            backgroundColor: "#0E0E0E"
        },
        backgroundSection: {
            height: "100%",
            width: "100%",
            position: "absolute"
        },
        back_drop: {
            height: "45%",
            top: paddingTopBackground,
            width: '100%',
            opacity: opacityBackground,
            position: "absolute",

            transform: [{scale: scaleBackground}],
        },
        gradientFade: {
            height: "30%",
            top: "25%"
        },
        backButton: {
            position: "absolute",
            top: 10,
            left: 5
        },
        list: {
            height: "100%"
        },
        section1: {
            paddingHorizontal: 35
        },
        title: {
            color: "white",
            fontSize: 43,
            fontWeight: "bold",
            paddingBottom: 10,
            paddingTop: "45%"
        },
        characteristics: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start"
        },
        stars: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: 30
        },
        starsLabel: {
            color: "#FFC42D",
            fontWeight: "bold",
            paddingLeft: 10,
            fontSize: 16
        },
        player: {
            borderRadius: 10,
            overflow: "hidden"
        },
        resume: {
            color: "#B3B3B3",
            paddingTop: 30,
            fontSize: 17
        },
        creditSection: {
            paddingTop: 30
        },
        creditTitle: {
            color: "#2998FD",
            paddingBottom: 20,
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600"
        },
        similarSection: {
            paddingTop: 30
        },
        similarTitle: {
            color: "#2998FD",
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600",
            paddingBottom: 20
        },
        similarContainer: {
            width: 90,
            marginHorizontal: 7
        },
        similarPoster: {
            height: 130,
            width: 90,
            borderRadius: 8
        },
        similarTitleFilm: {
            color: "#DADADA",
            paddingTop: 5,
            fontWeight: "300"
        },
        reviewSection: {
            paddingTop: 30
        },
        reviewTitle: {
            color: "#2998FD",
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600",
            paddingBottom: 10
        },
        reviewContainer: {
            marginHorizontal: 7,
            width: 300,
            padding: 20,
            backgroundColor: "#09090F",
            marginVertical: 10,
            borderRadius: 14,
            borderWidth: 0.8,
            borderColor: "rgba(223,223,223,0.14)"
        },
        reviewInfo: {
            flexDirection: "row",
            paddingBottom: 20
        },
        imageProfile: {
            height: 50,
            width: 50,
            borderRadius: 100
        },
        infoContainer: {
            paddingLeft: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignItems: "center"
        },
        pseudo: {
            color: "white",
            paddingTop: 5,
            fontWeight: "700",
            fontSize: 16
        },
        date: {
            color: "grey",
            paddingTop: 5,
            fontWeight: "500",
            fontSize: 14
        },
        message: {
            color: "#B3B3B3",
            paddingTop: 5,
            fontWeight: "400"
        },
        creditContainer: {
            width: 90,
            marginHorizontal: 7,
            alignItems: "center"
        },
        bubble: {
            justifyContent: "center"
        },
        photo: {
            height: 90,
            width: 90,
            borderRadius: 200,
            borderWidth: 3,
            borderColor: "rgba(255,255,255,0.8)"
        },
        popularityDot: {
            backgroundColor: "white",
            borderRadius: 20,
            padding: 2,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            right: 0,
            flexDirection: "row"
        },
        popularityLabel: {
            color: "black",
            fontWeight: "500",
            paddingRight: 4
        },
        creditName: {
            color: "#DADADA",
            paddingTop: 5,
            fontWeight: "300"
        }
    });

    const getTriller = async () => {
        const trailerResponse = (await fetch(config.base_url + "movie/" + item.id + "/videos?api_key=" + config.api_key + "&language=fr-FR"));

        const trailerJson = await trailerResponse.json();
        //console.log("trailer", trailerJson)
        // @ts-ignore
        const trailer_key = trailerJson.results.slice(0, 1).map((elt) => {
            if (elt["type"] === "Trailer" && elt["site"] === "YouTube") {
                return elt["key"];
            }
        });
        //console.log("key", trailer_key)
        setTrailerPath(trailer_key);
    }
    const getCredits = async () => {
        const creditResponse = (await fetch(config.base_url + "movie/" + item.id + "/credits?api_key=" + config.api_key + "&language=fr-FR"));

        const creditJson = await creditResponse.json();
        // @ts-ignore
        let creditList = creditJson.cast.map((elt) => {
            if (elt["popularity"])
                return [elt["name"], 'https://image.tmdb.org/t/p/w185' + elt["profile_path"], elt["popularity"]]
        });
        creditList = creditList.slice(0, 5).sort((a: [fullname: string, profile_path: string, popularity: number], b: [fullname: string, profil_path: string, popularity: number]) => b[2] - a[2]);

        setCredit(creditList);
    }
    const getSimilarMovies = async () => {
        const SimilarMoviesResponse = (await fetch(config.base_url + "movie/" + item.id + "/recommendations?api_key=" + config.api_key + "&language=fr-FR"));

        const SimilarMoviesJson = await SimilarMoviesResponse.json();
        // @ts-ignore
        const SimilarMoviesList = SimilarMoviesJson.results.slice(0, 10).map((elt) => {
            return new MinimalMovie(elt["original_title"], elt["poster_path"])
        });
        setSimilarMovies(SimilarMoviesList);
    }
    const getReview = async () => {
        const ReviewResponse = (await fetch(config.base_url + "movie/" + item.id + "/reviews?api_key=" + config.api_key + "&language=us-EN&page=1"));
        const ReviewJson = await ReviewResponse.json();
        // @ts-ignore
        let ReviewList = ReviewJson.results.slice(0, 5).map((elt) => {
            // @ts-ignore
            const newreview = new Review(elt["content"], elt["author_details"].avatar_path, elt["created_at"], elt["author"])
            return newreview
        });
        ReviewList = ReviewList.filter((review: Review, index: number, array: Review[]) => {
            return array.findIndex((item: Review) => item.pseudo === review.pseudo) === index;
        });
        setReview(ReviewList);
    }

    useEffect(() => {


        getTriller();
        getSimilarMovies();
        getCredits();
        getReview();
    }, []);


    return (
        <View style={styles.body}>
            <View style={styles.backgroundSection}>
                <Image
                    style={styles.back_drop}
                    source={{
                        uri: item.backdrop_path,
                    }}
                ></Image>

                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                />
                <LinearGradient style={styles.gradientFade}
                    // Button Linear Gradient
                                colors={['rgba(14,14,14,0)', 'rgba(14,14,14,0.7)', 'rgba(14,14,14,1)', 'rgba(14,14,14,1)']}>
                </LinearGradient>
            </View>


            <SafeAreaView style={styles.background1}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex: 100}}>
                    <Ionicons name="ios-arrow-back" size={30} color="white" style={styles.backButton}/>
                </TouchableOpacity>
                <ScrollView style={styles.list} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={4}
                >
                    <View style={styles.section1}>
                        <Text style={styles.title} numberOfLines={2}>{item.original_title}</Text>
                        <View style={styles.characteristics}>
                            <InfoBadge texte={`${item.genres[0]} ${item.genres[1] !== undefined ? ", " + item.genres[1] : ""}`}></InfoBadge>
                            <InfoBadge texte={item.release_date}></InfoBadge>
                            <InfoBadge texte={formatTime(item.runtime)}></InfoBadge>
                        </View>
                        <View style={styles.stars}>
                            <Stars note={item.vote_average} size={120}></Stars>
                            <Text style={styles.starsLabel}>{item.vote_average.toFixed(1)}</Text>

                        </View>
                        {trailerPath !== "" && (<YoutubeIframe webViewStyle={styles.player} height={195} play={false} videoId={trailerPath}/>)}
                        <Text style={styles.resume}>{item.overview}</Text>


                    </View>

                    {credit !== undefined && (
                        <View style={styles.creditSection}>
                            <Text style={styles.creditTitle}>Crédits</Text>
                            <CreditList data={credit}></CreditList>
                        </View>


                    )}
                    {similarMovies.length !== 0 && (
                        <View style={styles.similarSection}>
                            <Text style={styles.similarTitle}>Recommendations</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={similarMovies}
                                horizontal={true}
                                keyExtractor={item => item.original_title}
                                renderItem={({item}) =>
                                    <SimilarMovie movie={item}></SimilarMovie>
                                }
                            /></View>


                    )}

                    {review.length !== 0 && (
                        <View style={styles.reviewSection}>
                            <Text style={styles.reviewTitle}>Commentaires</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={review}
                                horizontal={true}
                                keyExtractor={item => item.pseudo}
                                renderItem={({item}) =>
                                    <ReviewComponent review={item}></ReviewComponent>
                                }
                            /></View>


                    )}


                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
