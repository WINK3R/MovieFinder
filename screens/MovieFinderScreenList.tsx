import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock, faHeart} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";


type Props = {
    page: string;
    children : React.PropsWithChildren<{}>
};
export default function MovieFinderScreenList(props : Props){


    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: insets.top + 22,
            backgroundColor: "#0E0E0E"
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
    })

    return (
        // @ts-ignore
        <SafeAreaView style={styles.container}>
            <View style={styles.titlePage}>
                <FontAwesomeIcon icon={props.page=="Favorite"?faHeart:faClock} style={styles.icon} size={40} color="white"/>
                {props.page=="Favorite"?<Text style={styles.h1}>Favourite</Text>:<Text style={styles.h1}>Watch Later</Text>}
            </View>
            <Image source={require('../assets/images/delimiter.png')} style={styles.delimiter}/>
            {props.children}
        </SafeAreaView>
    );
};