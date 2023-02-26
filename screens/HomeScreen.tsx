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
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {addMovieToWatchLater, addMovieToFavourite, getTrendingID, removeMovieTrending,} from "../redux/actions/actionGetTrendingID";
import {useDispatch, useSelector} from 'react-redux';
import Movie from "../model/Movie";
import * as url from "url";
import moment from 'moment';
import CardsSwipe from 'react-native-cards-swipe';


export default function HomeScreen({navigation}: RootStackScreenProps<'Home'>) {
    // @ts-ignore
    const trendingMovies = useSelector(state => state.appReducer.trendingMovies);


    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [displayIndex, setdisplayIndex] = useState(0);
    var swiper = null;

    //console.log("liste [0]: ", trendingMovies[0]);

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

    function formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }


    return (

        <>
            <ImageBackground blurRadius={0}
                             style={{
                                 width: "110%",
                                 height: "110%",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 opacity: 0.15,
                                 position: "absolute",
                                 zIndex: 0

                             }}
                             source={require("../assets/images/background.png")
                             }
            ></ImageBackground>

            {trendingMovies.length !== 0 && (

                <SafeAreaView style={styles.background1}>


                    <ImageBackground blurRadius={8}
                                     style={{
                                         width: "150%",
                                         height: "150%",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         opacity: 0.48,
                                         position: 'absolute',
                                         left: "-50%",
                                         top: "-50%"

                                     }}
                                     source={{
                                         uri: trendingMovies[displayIndex]?.poster_path,
                                     }}
                    ></ImageBackground>
                    <View style={{flexDirection: 'column', alignSelf: 'center', paddingHorizontal: 30, width: '100%', alignItems: "center", paddingTop: 10, flex: 0.07}}>
                        <Text numberOfLines={1} style={{color: "white", fontSize: 30, fontWeight: "bold", paddingTop: 5, alignSelf: "center"}}>{trendingMovies[displayIndex].original_title}</Text>
                        <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
                            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${trendingMovies[displayIndex].release_date}`}</Text>
                            <View style={styles.circle}/>
                            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${trendingMovies[displayIndex].genres[0]} ${trendingMovies[displayIndex].genres[1] !== undefined ? ", " + trendingMovies[0].genres[1] : ""}`}</Text>
                            <View style={styles.circle}/>
                            <Text style={{color: "#D1D1D1", fontSize: 20, fontWeight: "normal", paddingTop: 5}}>{`${formatTime(trendingMovies[displayIndex].runtime)}`}</Text>
                        </View>
                        <Stars note={trendingMovies[displayIndex].vote_average} size={110}/>
                    </View>

                    <CardsSwipe
                        ref={(rf) => {
                            swiper = rf
                        }}
                        containerStyle={{zIndex: 20}}
                        cards={trendingMovies}
                        loop={true}
                        onSwipedLeft={(index) => {
                            console.log(index)
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
                                <Image
                                    style={styles.filmCard}
                                    source={{
                                        uri: card?.poster_path,
                                    }}
                                />)
                        }
                    />


                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-evenly", paddingHorizontal: 30, width: '100%', position: "absolute", top: "74%", zIndex: 30}}>
                        <TouchableOpacity onPress={() => {

                            addWatchLater(trendingMovies[displayIndex]);


                        }}>
                            <Image
                                source={require('../assets/images/watchlater_button.png')} style={{resizeMode: "stretch", height: '55%', aspectRatio: 1,}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            () => {
                                popFirstTrending(trendingMovies[displayIndex]);
                            }}>
                            <Image
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
                    <View style={{zIndex: 1, alignContent: "center", justifyContent: "center", flex: 0.15, flexDirection: "row"}}>
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
            {trendingMovies.length === 0 && (
                <SafeAreaView style={styles.background2}>
                    <View style={{alignItems: "center", width: "100%", height: "100%", justifyContent: "center", zIndex: 1}}>
                        <Text style={{color: "white", fontWeight: "600", fontSize: 35}}>Félicitations !</Text>
                        <Image
                            source={require('../assets/images/confetti.gif')}
                            style={{width: 200, height: 200, marginVertical: 50}}
                        />
                        <Text style={{color: "grey", fontWeight: "400", paddingHorizontal: 70, textAlign: "center"}}>Vous avez fini la collection du jour.
                            {"\n"}Revenez à la fin du décompte pour découvrir de nouvelles propositions.</Text>

                        <View style={{zIndex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, flexDirection: "row", bottom: 0, backgroundColor: "white", marginTop: 50}}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>Nouvelle collection dans</Text>
                            <Image source={require('../assets/images/timer_icon2.png')} style={{
                                height: 30,
                                resizeMode: 'contain', marginHorizontal: 7

                            }}></Image>

                            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${hours.toString().padStart(2, '0')}:`}</Text>
                            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${minutes.toString().padStart(2, '0')}:`}</Text>
                            <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>{`${seconds.toString().padStart(2, '0')}`}</Text>
                        </View>
                    </View>

                </SafeAreaView>
            )

            }

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
    size: number

}

export function Stars(props: StarsProps) {
    let imageSource;
    let note = props.note / 2;
    if (note < 0.5)
        imageSource = require('../assets/images/0.5stars_vote.png');
    else if (note < 1)
        imageSource = require('../assets/images/1stars_vote.png');
    else if (note < 1.5)
        imageSource = require('../assets/images/1.5stars_vote.png');
    else if (note < 2)
        imageSource = require('../assets/images/2stars_vote.png');
    else if (note < 2.5)
        imageSource = require('../assets/images/2.5stars_vote.png');
    else if (note < 3)
        imageSource = require('../assets/images/3stars_vote.png');
    else if (note < 3.5)
        imageSource = require('../assets/images/3.5stars_vote.png');
    else if (note < 4)
        imageSource = require('../assets/images/4stars_vote.png');
    else if (note < 4.5)
        imageSource = require('../assets/images/4.5stars_vote.png');
    else if (note < 5)
        imageSource = require('../assets/images/5stars_vote.png');

    return (
        <View>
            <Image source={imageSource} style={{
                width: 110,
                height: 40,
                resizeMode: 'contain'
            }}/>
        </View>
    );
};

