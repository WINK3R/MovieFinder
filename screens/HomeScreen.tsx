import * as React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import {RootStackScreenProps} from "../types";
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {addMovieToWatchLater, addMovieToFavourite, removeMovieTrending,} from "../redux/actions/actionGetTrendingID";
import {useDispatch, useSelector} from 'react-redux';
import Movie from "../model/Movie";
import moment from 'moment';
import CardsSwipe from 'react-native-cards-swipe';
import AnimatedLottieView from "lottie-react-native";
import {Timer, Timer2} from "../components/TimerComponent";
import {HeaderMovie} from "../components/HeaderMovieComponent";
import config from "../constants/config.js";
import * as https from "https";
import {NewCard, SuggestedCard} from "../components/cards";

export default function HomeScreen({navigation}: RootStackScreenProps<'Home'>) {
    // @ts-ignore
    const trendingMovies = useSelector(state => state.appReducer.trendingMovies);
    const dispatch = useDispatch();

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [displayIndex, setdisplayIndex] = useState(0);
    const [suggestedMovies, setSuggestedMovies] = useState<number[]>([]);

    var swiper: any = null;

    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        background1: {
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
        },
        background2: {
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
        },
        container: {
            flex: 1,
        },
        filmCard: {
            width: '85%',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 22,
            flex: 0.80,
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            alignSelf: 'center',
            elevation: 13,
            zIndex: 15

        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // or 'stretch'
        },
        child: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        explanation: {
            color: "grey",
            fontWeight: "400",
            paddingHorizontal: 70,
            textAlign: "center"
        },
        h1: {
            color: "white",
            fontWeight: "600",
            fontSize: 35
        },
        congratsSection: {
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            zIndex: 1
        },
        button: {
            resizeMode: "stretch",
            height: '55%',
            aspectRatio: 1,
        },
        buttonSection: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: "space-evenly",
            paddingHorizontal: 30,
            width: '100%',
            position: "absolute",
            top: "74%",
            zIndex: 30
        },
        posterBackground: {
            width: "150%",
            height: "150%",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.55,
            position: 'absolute',
            left: "-50%",
            top: "-50%"
        },
        finishBackground: {
            width: "110%",
            height: "110%",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.15,
            position: "absolute",
            zIndex: 0
        }


    });


    useEffect(() => {
        const interval = setInterval(() => {
            const today = moment();

            today.set({hour: 0, minute: 0, second: 0, millisecond: 0});

            const tonight = today.add(1, 'days');

            const timestamp = tonight.valueOf();
            const now = new Date();
            const difference = timestamp - now.getTime();
            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );

            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);

            setSeconds(s);
        });
        getSuggested();
    }, []);


    const getSuggested = async () => {
        const suggestedResponse = (await fetch("https://codefirst.iut.uca.fr/containers/lucasdelanier-containermoviefinder/api/Suggested"));
        const suggestedJson = await suggestedResponse.json();
        //console.log("trailer", trailerJson)
        // @ts-ignore
        const suggestedMovies = suggestedJson.map((element) => {
            return element;

        })
        console.log("suggested", suggestedMovies)
        setSuggestedMovies(suggestedMovies);
    }

    function addWatchLater(props: Movie) {
        dispatch(addMovieToWatchLater(props));
        dispatch(removeMovieTrending(props));
        console.log("movie: ", props.id, props.full_date, new Date(props.full_date).getTime()), new Date(trendingMovies[displayIndex].full_date).getTime();
        if (displayIndex == trendingMovies.length - 1) {
            setdisplayIndex(0);
            swiper.swipeLeft();
        }
    }

    function addFavourite(props: Movie) {
        dispatch(addMovieToFavourite(props));
        dispatch(removeMovieTrending(props));
        if (displayIndex == trendingMovies.length - 1) {
            setdisplayIndex(0);
            swiper.swipeLeft();
        }
    }


    function popFirstTrending(props: Movie) {
        dispatch(removeMovieTrending(props));
        if (displayIndex == trendingMovies.length - 1) {
            setdisplayIndex(0);
            swiper.swipeLeft();
        }
    }


    return (

        <>
            <ImageBackground blurRadius={0}
                             style={styles.finishBackground}
                             source={require("../assets/images/background.png")
                             }
            ></ImageBackground>

            {trendingMovies.length !== 0 && (

                <SafeAreaView style={styles.background1}>


                    <ImageBackground blurRadius={29}
                                     style={styles.posterBackground}
                                     source={{
                                         uri: trendingMovies[displayIndex]?.poster_path,
                                     }}
                    ></ImageBackground>
                    <HeaderMovie movie={trendingMovies[displayIndex]}></HeaderMovie>


                    <CardsSwipe
                        ref={(rf) => {
                            swiper = rf
                        }}
                        containerStyle={{zIndex: 20}}
                        cards={trendingMovies}
                        loop={true}
                        onSwipedLeft={(index) => {
                            if (index < trendingMovies.length - 1) {

                                setdisplayIndex(index + 1);

                            } else
                                setdisplayIndex(0)
                        }
                        }
                        onSwipedRight={(index) => {
                            if (index < trendingMovies.length)
                                setdisplayIndex(index + 1)
                            else
                                setdisplayIndex(0)
                        }}

                        renderCard={(card) =>
                            (
                                <>
                                    <View style={{position: "absolute", zIndex: 20, top: 80, right: 20, alignItems: "flex-end"}}>
                                        {suggestedMovies.includes(trendingMovies[displayIndex].id) && (<SuggestedCard></SuggestedCard>)}
                                        {(new Date().setDate(new Date().getDate() - 14) < new Date(trendingMovies[displayIndex].full_date).getTime()) && (<NewCard></NewCard>)}
                                    </View>

                                    <Image
                                        style={styles.filmCard}
                                        source={{
                                            uri: card?.poster_path,
                                        }}
                                    />

                                </>
                            )
                        }
                    />


                    <View style={styles.buttonSection}>
                        <TouchableOpacity onPress={() => {

                            addWatchLater(trendingMovies[displayIndex]);


                        }}>
                            <Image
                                source={require('../assets/images/watchlater_button.png')} style={styles.button}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            () => {
                                popFirstTrending(trendingMovies[displayIndex]);
                            }}>
                            <Image
                                source={require('../assets/images/delete_button.png')} style={styles.button}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            addFavourite(trendingMovies[displayIndex]);
                        }
                        }>
                            <Image
                                source={require('../assets/images/like_button.png')} style={styles.button}
                            />

                        </TouchableOpacity>
                    </View>
                    <Timer hours={hours} minutes={minutes} seconds={seconds}></Timer>


                </SafeAreaView>)}
            {trendingMovies.length === 0 && (
                <SafeAreaView style={styles.background2}>
                    <View style={styles.congratsSection}>
                        <Text style={styles.h1}>Félicitations !</Text>
                        <AnimatedLottieView source={require("../assets/animation.json")} autoPlay={true} loop={true} style={{height: 200}}/>
                        <Text style={styles.explanation}>Vous avez fini la collection du jour.
                            {"\n"}Revenez à la fin du décompte pour découvrir de nouvelles propositions.</Text>

                        <Timer2 hours={hours} minutes={minutes} seconds={seconds}></Timer2>
                    </View>

                </SafeAreaView>
            )

            }

        </>

    )
}









