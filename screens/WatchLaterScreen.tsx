import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput} from 'react-native';
import * as React from "react";
import {BadgeFilm} from "./HomeScreen";
import { FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import LinearGradient from 'react-native-linear-gradient';
import {RootTabScreenProps} from "../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useDispatch,useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getTrendingID} from "../redux/actions/actionGetTrendingID";
import Movie from "../model/Movie";
export default function WatchLaterScreen({ navigation }: RootTabScreenProps<'WatchLater'>) {
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
    const [isLoading, setLoading] = useState(true);
    // @ts-ignore
    const trendingMovies = useSelector(state => state.appReducer.watchLaterMovies);

  return (
      <SafeAreaView style={styles.container}>
          <View style={{height: 50, justifyContent: "flex-start",flexDirection: 'row', paddingHorizontal:20,  marginBottom: 15,marginVertical:5, alignItems:"flex-end"}} >
              <FontAwesomeIcon icon={faClock} style={{marginBottom: -5, marginRight: 20}} size={50} color="white" />

                <Text style={{color: "white", fontSize:30}}>Watch Later</Text>
          </View>
          <Image
              source={require('../assets/images/delimiter.png')} style={{height: 2, width: 400, resizeMode:"stretch"}}
          />
          <View style={{height:40, width:400, backgroundColor:"grey", borderRadius:20, marginVertical:10, alignSelf:"center"}}>
              <TextInput style={{width:'100%', height:40, marginHorizontal:20}} ></TextInput>
          </View>
          <FlatList
              data={trendingMovies}
              keyExtractor={item => item.original_title}
              renderItem={({item}) => <ListWidget movie={item} ></ListWidget>}
          />
      </SafeAreaView>
  );
}
type ListWidgetProps = {
    movie : Movie

}

export function ListWidget(props: ListWidgetProps) {
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        filmCard: {
            width: 70,
            height: 100,
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
        height: 100,
        borderRadius: 20,
        justifyContent: "flex-start",
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 5
    }}>
        <Image
            style={styles.filmCard}
            source={{
                uri: props.movie.poster_path,
            }}
        />
        <View style={{
            height: 100,
            borderRadius: 20,
            justifyContent: "flex-start",
            flexDirection: 'column',
            paddingLeft: 10
        }}>
            <Text numberOfLines={1} style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 25,
                paddingRight: 50
            }}>{props.movie.original_title}</Text>
            <Text style={{color: "grey", fontWeight: "bold", fontSize: 17}}>{formatTime(props.movie.runtime)}</Text>
            <View style={{marginVertical: 10}}>
                <BadgeFilm name={"Science-Ficton"}/>
            </View>
        </View>
    </View>


        );


}

