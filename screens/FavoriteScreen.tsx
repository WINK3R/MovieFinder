import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput} from 'react-native';
import * as React from "react";
import { FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import {RootTabScreenProps} from "../types";
import {useState} from "react";
import MovieList from "../components/MovieList";
import {ListWidget} from "./WatchLaterScreen";


export default function FavoriteScreen({ navigation }: RootTabScreenProps<'Favorite'>) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 50, justifyContent: "flex-start",flexDirection: 'row', paddingHorizontal:20,  marginBottom: 15,marginVertical:5, alignItems:"flex-end"}} >
                <FontAwesomeIcon icon={faHeart} style={{marginBottom: -5, marginRight: 20}} size={50} color="white" />

                <Text style={{color: "white", fontSize:30}}>Favorite</Text>
            </View>
            <Image
                source={require('../assets/images/delimiter.png')} style={{height: 2, width: 400, resizeMode:"stretch"}}
            />
            <View style={{height:40, width:400, backgroundColor:"grey", borderRadius:20, marginVertical:10, alignSelf:"center"}}>
                <TextInput style={{width:'100%', height:40, marginHorizontal:20}} ></TextInput>
            </View>
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <ListWidget name={item.key} ></ListWidget>}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "#232323"
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


