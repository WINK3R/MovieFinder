import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput, TouchableHighlight} from 'react-native';
import * as React from "react";
import {BadgeFilm, Stars} from "./HomeScreen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {RootTabScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getTrendingID, getWatchLater, getWatchLaterMovies} from "../redux/actions/actionGetTrendingID";
import Movie from "../model/Movie";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from 'expo-linear-gradient';

export default function WatchLaterScreen({navigation}: RootTabScreenProps<'WatchLater'>) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState<Movie[]>([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
            backgroundColor: "#0E0E0E"
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
            width: 70,
            height: 110,
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

        <LinearGradient style={{
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
        }} start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
            // Button Linear Gradient
                        colors={['#0B0B0B', '#1F1F1F']}>


            <Image
                style={styles.filmCard}
                source={{
                    uri: props.movie.poster_path_min,
                }}
            />
            <View style={{
                height: 130,
                width: "85%",
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
                        <Stars note={props.movie.vote_average} size={90}></Stars>
                        <Text style={{paddingLeft: 7, color: "white", fontWeight: "bold", fontSize: 13}}>{props.movie.vote_average.toFixed(1)}</Text>
                    </View>

                    <Text style={{color: "grey", fontWeight: "600"}}>{formatTime(props.movie.runtime)}</Text>
                </View>
                <Text numberOfLines={3} style={{color: "#C7C7C7", fontWeight: "600",}}>{props.movie.overview}</Text>

            </View>
        </LinearGradient>
    );
}