import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput, TouchableHighlight} from 'react-native';
import * as React from "react";
import {BadgeFilm, Stars} from "./HomeScreen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import LinearGradient from 'react-native-linear-gradient';
import {RootTabScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getTrendingID, getWatchLater, getWatchLaterMovies} from "../redux/actions/actionGetTrendingID";
import Movie from "../model/Movie";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {useNavigation} from "@react-navigation/native";

export default function WatchLaterScreen({navigation}: RootTabScreenProps<'WatchLater'>) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState<Movie[]>([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
            backgroundColor: "#232323"
        },
        linearGradient: {
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
            color: "white"
        },
        filmCard: {
            width: 70,
            height: 100,
            borderRadius: 8,
        },
    });
    const dispatch = useDispatch();
    // @ts-ignore
    const watchLaterMovies = useSelector(state => state.appReducer.watchLaterMovies);
    useEffect(() => {
        const loadWatchLater = async () => {
            // @ts-ignore
            await dispatch(getWatchLater());
        };
        console.log("test11111:", watchLaterMovies);
        loadWatchLater();
    }, [dispatch]);

    const searchFilterFunction = (text: string) => {
        if (text) {
            const newData = watchLaterMovies.filter(function (item: Movie) {
                const itemData = item.original_title
                    ? item.original_title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 50, justifyContent: "flex-start", flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15, marginVertical: 5, alignItems: "flex-end"}}>
                <FontAwesomeIcon icon={faClock} style={{marginBottom: -5, marginRight: 20}} size={50} color="white"/>
                <Text style={{color: "white", fontSize: 30}}>Watch Later</Text>
            </View>
            <Image
                source={require('../assets/images/delimiter.png')} style={{height: 2, width: 400, resizeMode: "stretch"}}
            />

            <View style={{height: 40, width: 400, backgroundColor: "grey", borderRadius: 20, marginVertical: 10, alignSelf: "center"}}>
                <TextInput style={{width: '100%', height: 40, marginHorizontal: 20}} onChangeText={(text) => searchFilterFunction(text)}
                           value={search}
                ></TextInput>
            </View>
            <FlatList
                data={search.length !== 0 ? filteredDataSource : watchLaterMovies}
                keyExtractor={item => item.original_title}
                renderItem={({item}) => <TouchableHighlight onPress={() => navigation.navigate("Info", {"item": item})}><ListWidget movie={item}></ListWidget></TouchableHighlight>}
            />
        </SafeAreaView>
    );
}

type ListWidgetProps = {
    movie: Movie

}

export function ListWidget(props: ListWidgetProps) {
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        filmCard: {
            width: 90,
            height: 130,
            borderRadius: 8,


        },
    });

    function formatTime(time: number) {
        console.log(time);
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
    }

    return (
        <View style={{
            height: 130,
            width: "100%",
            borderRadius: 20,
            justifyContent: "flex-start",
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 15
        }}>

            <Image
                style={styles.filmCard}
                source={{
                    uri: props.movie.poster_path,
                }}
            />
            <View style={{
                height: 130,
                width: "70%",
                justifyContent: "center",
                flexDirection: 'column',
                paddingRight: 20,
                paddingLeft: 20,
            }}>
                <Text numberOfLines={1} style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 21,
                }}>{props.movie.original_title}</Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                    <View style={{flexDirection: "row", alignItems: "center",}}>
                        <Stars note={props.movie.vote_average} size={70}></Stars>
                        <Text style={{paddingLeft: 10, color: "white", fontWeight: "bold"}}>{props.movie.vote_average.toFixed(1)}</Text>
                    </View>

                    <Text style={{color: "grey", fontWeight: "600"}}>{formatTime(props.movie.runtime)}</Text>
                </View>
                <Text numberOfLines={3} style={{color: "grey", fontWeight: "600",}}>{props.movie.overview}</Text>

            </View>
        </View>
    );
}