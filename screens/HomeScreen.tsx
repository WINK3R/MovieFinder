import * as React from 'react';
import {Button,TouchableOpacity,ScrollView,View, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import {RootStackScreenProps} from "../types.js";
import Rive from 'rive-react-native';
import {useEffect, useRef, useState} from "react";
import {RiveViewManager} from "rive-react-native/lib/typescript/Rive.js";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function App({ navigation }: RootStackScreenProps<'Home'>) {
    const insets = useSafeAreaInsets();



    const styles = StyleSheet.create({
        background: {
            backgroundColor: 'black',
            height: '100%',
            paddingTop: insets.top,
        },

        container:{
            flex: 1,
        },
        filmCard: {
            width: '80%',
            height: '60%',
            justifyContent:'center',
            marginLeft:'auto',
            marginRight:'auto',
            borderRadius: 15,


        },
        image: {
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            flex: 1,
            paddingTop: 70,
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

    });
    return (
        <SafeAreaView style={styles.background}>

            <ImageBackground blurRadius={20}
                             style={{
                                 position: 'absolute',
                                 width: "120%",
                                 height: "120%",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 opacity: 0.28
                             }}
                             source={{
                                 uri: 'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
                             }}
            ></ImageBackground>
            <View style={styles.image}>
                <Image
                    style={styles.filmCard}
                    source={{
                        uri: 'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
                    }}
                />
            </View>
            <View style={{height:35, marginTop: 10, marginBottom: 15}}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={true}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>
                    <BadgeGenre name={"cc"} isSelected={false}></BadgeGenre>



                </ScrollView>
            </View>
            <View style={{ flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 30, flex: 1 }}>

                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'flex-start', width: "100%"}}>
                    <BadgeFilm name={"Science-fiction"}></BadgeFilm>
                    <BadgeFilm name={"Science-fiction"}></BadgeFilm>
                    <BadgeFilm name={"9:11"}></BadgeFilm>
                </View>
                    <View>
                        <Text numberOfLines={1} style={{color: "white", fontSize: 28, fontWeight: "bold", paddingTop: 5}}>SPIDER-MAN No Way Home</Text>
                    </View>
                <Text style={{color: "grey", fontSize: 20, fontWeight: "bold"}}>Jean-Marc généreux</Text>
            </View>
            <View style={{ flexDirection: 'row' ,alignItems: 'center', justifyContent: "space-evenly", paddingHorizontal: 30, height: '15%', width:'100%'}}>
            <TouchableOpacity>
                <Image
                    source={require('../assets/images/WatchLater.png')} style={{ resizeMode:"stretch",  height:'65%', aspectRatio: 1,}}
                />

            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../assets/images/Generate.png')} style={{resizeMode:"stretch", height:'85%',aspectRatio: 1,}}
                />

            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../assets/images/Favorite.png')} style={{ resizeMode:"stretch", height:'65%', aspectRatio: 1,}}
                />

            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

type BadgeGenreProps = {
    name : String
    isSelected: Boolean

}

export function BadgeGenre(props: BadgeGenreProps) {
    if(props.isSelected==false){
        return (
            <View style={{paddingHorizontal: 20,  marginHorizontal: 5,height: 35, backgroundColor: '#2E2E2E', borderRadius: 20, justifyContent: "center"}} >
                <Text style={{color: "white"}}>{props.name}</Text>
            </View>

        );
    }
    else{
        return (
            <View style={{paddingHorizontal: 20,  marginHorizontal: 5,height: 35, backgroundColor: '#5C5C5C', borderRadius: 20, borderWidth: 1, borderColor: "white" ,justifyContent: "center"}} >
                <Text style={{color: "white"}}>{props.name}</Text>
            </View>

        );
    }


}

type BadgeFilmProps = {
    name : String

}
export function BadgeFilm(props: BadgeFilmProps) {

        return (
            <View style={{paddingHorizontal: 15,  marginHorizontal: 5,height: 30, backgroundColor: '#8906B8', borderRadius: 15, justifyContent: "center", alignSelf: "flex-start"}} >
                <Text style={{color: "white", fontSize: 12, fontWeight:"bold"}}>{props.name}</Text>
            </View>

        );


}
