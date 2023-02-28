import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput, TouchableHighlight} from 'react-native';
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {RootTabScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getFavourite} from "../redux/actions/actionGetTrendingID";
import Movie from "../model/Movie";

import {MovieListComponent} from "../components/MovieListComponent";


export default function FavoriteScreen({navigation}: RootTabScreenProps<'Favorite'>) {

    const [search, setSearch] = useState('');

    const [filteredDataSource, setFilteredDataSource] = useState<Movie[]>([]);

    const [masterDataSource] = useState([]);

    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: insets.top + 22,
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
        searchSection: {
            height: 40,
            width: 400,
            backgroundColor: "grey",
            borderRadius: 20,
            marginVertical: 10,
            alignSelf: "center"
        },
        searchBar: {
            width: '100%',
            height: 40,
            marginHorizontal: 20
        },
        titlePage: {
            height: 50,
            justifyContent: "flex-start",
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginBottom: 15,
            marginVertical: 5,
            alignItems: "flex-end"
        },
        icon: {
            marginBottom: -5,
            marginRight: 20
        },
        delimiter: {
            height: 2,
            width: 400,
            resizeMode: "stretch"
        },
        h1: {
            color: "white",
            fontSize: 30
        }
    });
    // @ts-ignore
    const favouriteMovies = useSelector(state => state.appReducer.favouriteMovies);

    const dispatch = useDispatch();

    useEffect(() => {
        const loadFavourite = async () => {
            // @ts-ignore
            await dispatch(getFavourite());
        };
        loadFavourite();
    }, [dispatch]);

    const searchFilterFunction = (text: string) => {
        if (text) {
            const newData = favouriteMovies.filter(function (item: Movie) {
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
            <View style={styles.titlePage}>
                <FontAwesomeIcon icon={faClock} style={styles.icon} size={50} color="white"/>
                <Text style={styles.h1}>Watch Later</Text>
            </View>
            <Image
                source={require('../assets/images/delimiter.png')} style={styles.delimiter}
            />

            <View style={styles.searchSection}>
                <TextInput style={styles.searchBar} onChangeText={(text) => searchFilterFunction(text)}
                           value={search}
                ></TextInput>
            </View>
            <FlatList
                data={search.length !== 0 ? filteredDataSource : favouriteMovies}
                keyExtractor={item => item.original_title}
                // @ts-ignore
                renderItem={({item}) => <TouchableHighlight onPress={() => navigation.navigate("Info", {"item": item})}><MovieListComponent movie={item}></MovieListComponent></TouchableHighlight>}
            />
        </SafeAreaView>
    );
}

