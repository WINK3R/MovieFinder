import {FlatList, StyleSheet, SafeAreaView, Text, View, Image, TextInput} from 'react-native';
import * as React from "react";
import {BadgeFilm} from "./HomeScreen";
import { FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import LinearGradient from 'react-native-linear-gradient';
import {RootTabScreenProps} from "../types.js";

export default function WatchLaterScreen({ navigation }: RootTabScreenProps<'WatchLater'>) {
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
              <TextInput style={{width:300, height:40, marginHorizontal:20}} ></TextInput>
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

type ListWidgetProps = {
    name : String

}

export function ListWidget(props: ListWidgetProps) {
return (
            <View style={{height: 100, borderRadius: 20, justifyContent: "flex-start", flexDirection: 'row', paddingHorizontal:20, marginVertical:5}} >
                <Image
                    style={styles.filmCard}
                    source={{
                        uri: 'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
                    }}
                />
                <View style={{height: 100, borderRadius: 20, justifyContent: "flex-start", flexDirection: 'column', paddingLeft:10}} >
                    <Text style={{color: "white", fontWeight:"bold", fontSize:25}}>{props.name}</Text>
                    <Text style={{color: "grey", fontWeight:"bold", fontSize:17}}>{props.name}</Text>
                    <View style={{marginVertical:10}}>
                        <BadgeFilm name={"Science-Ficton"}/>
                    </View>
                </View>
            </View>


        );


}

