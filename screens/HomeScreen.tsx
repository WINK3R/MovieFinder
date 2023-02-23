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
    ActivityIndicator, FlatList, Animated, Easing
} from 'react-native';
import {RootStackScreenProps} from "../types";
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {addMovieToWatchLater, getTrendingID, removeMovieTrending,} from "../redux/actions/actionGetTrendingID";
import {useDispatch, useSelector} from 'react-redux';
import Movie from "../model/Movie";
import * as url from "url";
import moment from 'moment';

export default function HomeScreen({navigation}: RootStackScreenProps<'Home'>) {
    // @ts-ignore
    const trendingMovies = useSelector(state => state.appReducer.trendingMovies);


    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    //console.log("liste [0]: ", trendingMovies[0]);

    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
        },

        container: {
            flex: 1,
        },
        filmCard: {
            width: '85%',
            height: '68%',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 22,
            marginTop: 15,
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

        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // or 'stretch'
        },
        child: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        circle: {
            width: 6,
            height: 6,
            borderRadius: 100 / 2,
            marginTop: 4,
            backgroundColor: "lightgray",
            marginHorizontal: 8
        },

    });


    const dispatch = useDispatch();

    useEffect(() => {
        // Créez une date avec la valeur actuelle
        const interval = setInterval(() => {
            const today = moment();

// Définissez l'heure sur minuit
            today.set({hour: 0, minute: 0, second: 0, millisecond: 0});

// Ajoutez un jour pour obtenir demain (ce soir à minuit)
            const tonight = today.add(1, 'days');

// Obtenez le timestamp en millisecondes
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
            //console.log("timer", h, m, s);
        });
        setTimeout(() => interval, 10000);

        const loadTrendingID = async () => {
            // @ts-ignore
            await dispatch(getTrendingID());
        };
        //console.log("test1:", trendingMovies);
        loadTrendingID();
    }, [dispatch]);

    type ItemProps = {
        movie: Movie

    }

    function addWatchLater(props: Movie) {
        dispatch(addMovieToWatchLater(props));
        dispatch(removeMovieTrending(props));
    }


    function popFirstTrending(props: Movie) {
        dispatch(removeMovieTrending(props));
    }

    function formatTime(time: number) {
        console.log(time);
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    let rotateValueHolder = new Animated.Value(0);


    return (
        <>
            {trendingMovies.length !== 0 && (
                <SafeAreaView style={styles.background}>
                    <ImageBackground blurRadius={8}
                                     style={{
                                         position: 'absolute',
                                         width: "200%",
                                         height: "200%",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         opacity: 0.68
                                     }}
                                     source={{
                                         uri: trendingMovies[0].poster_path,
                                     }}
                    ></ImageBackground>
                    <View style={{flexDirection: 'column', alignSelf: 'center', paddingHorizontal: 30, width: '100%', alignItems: "center"}}>
                        <Text numberOfLines={1} style={{color: "white", fontSize: 30, fontWeight: "bold", paddingTop: 5, alignSelf: "center"}}>{trendingMovies[0].original_title}</Text>
                        <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
                            <Text style={{color: "#AAAAAA", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${trendingMovies[0].release_date}`}</Text>
                            <View style={styles.circle}/>
                            <Text style={{color: "#AAAAAA", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${trendingMovies[0].genres[0]}, ${trendingMovies[0].genres[1]}`}</Text>
                            <View style={styles.circle}/>
                            <Text style={{color: "#AAAAAA", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${formatTime(trendingMovies[0].runtime)}`}</Text>
                        </View>
                        <Stars note={Math.round(trendingMovies[0].vote_average)}/>
                    </View>
                    <Image
                        style={styles.filmCard}
                        source={{
                            uri: trendingMovies[0].poster_path,
                        }}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-evenly", paddingHorizontal: 30, width: '100%', position: "absolute", top: "79%", zIndex: 30}}>
                        <TouchableOpacity onPress={() => addWatchLater(trendingMovies[0])}>
                            <Image
                                source={require('../assets/images/watchlater_button.png')} style={{resizeMode: "stretch", height: '55%', aspectRatio: 1,}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            () => popFirstTrending(trendingMovies[0])}>
                            <Animated.Image
                                source={require('../assets/images/delete_button.png')} style={{
                                resizeMode: "stretch", height: '55%', aspectRatio: 1,
                            }}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/images/like_button.png')} style={{resizeMode: "stretch", height: '55%', aspectRatio: 1,}}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={{zIndex: 10, alignItems: "center", justifyContent: "center", flex: 1, flexDirection: "row"}}>
                        <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>Nouvelle collection dans</Text>
                        <Image source={require('../assets/images/timer_icon.png')} style={{
                            height: 30,
                            resizeMode: 'contain'
                        }}></Image>
                        <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${hours.toString().padStart(2, '0')}:`}</Text>
                        <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${minutes.toString().padStart(2, '0')}:`}</Text>
                        <Text style={{color: "#FFF", fontSize: 16, fontWeight: "500"}}>{`${seconds.toString().padStart(2, '0')}`}</Text>
                    </View>


                </SafeAreaView>)}
        </>
    )
}
type BadgeGenreProps = {
    name: String
    isSelected: Boolean

}

export function BadgeGenre(props: BadgeGenreProps) {
    if (props.isSelected === false) {
        return (
            <View style={{paddingHorizontal: 20, marginHorizontal: 5, height: 35, backgroundColor: '#2E2E2E', borderRadius: 20, justifyContent: "center"}}>
                <Text style={{color: "white"}}>{props.name}</Text>
            </View>

        );
    } else {
        return (
            <View style={{paddingHorizontal: 20, marginHorizontal: 5, height: 35, backgroundColor: '#5C5C5C', borderRadius: 20, borderWidth: 1, borderColor: "white", justifyContent: "center"}}>
                <Text style={{color: "white"}}>{props.name}</Text>
            </View>

        );
    }


}

type BadgeFilmProps = {
    name: String

}

export function BadgeFilm(props: BadgeFilmProps) {

    return (
        <View style={{
            paddingHorizontal: 15,
            marginHorizontal: 5,
            height: 30,
            backgroundColor: '#8906B8',
            borderRadius: 15,
            justifyContent: "center",
            alignSelf: "flex-start"
        }}>
            <Text style={{color: "white", fontSize: 12, fontWeight: "bold"}}>{props.name}</Text>
        </View>

    );


}

type StarsProps = {
    note: number

}

export function Stars(props: StarsProps) {
    console.log("note", props.note)
    let imageSource;

    if (props.note < 2)
        imageSource = require('../assets/images/1stars_vote.png');
    else if (props.note < 4)
        imageSource = require('../assets/images/2stars_vote.png');
    else if (props.note < 6)
        imageSource = require('../assets/images/3stars_vote.png');
    else if (props.note < 8)
        imageSource = require('../assets/images/4stars_vote.png');
    else if (props.note < 10)
        imageSource = require('../assets/images/5stars_vote.png');

    return (
        <View>
            <Image source={imageSource} style={{
                width: 130,
                height: 40,
                resizeMode: 'contain'
            }}/>
        </View>
    );
};
