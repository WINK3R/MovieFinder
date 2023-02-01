import {useEffect, useState} from "react";
import {View} from "react-native";
import {ListWidget} from "./ListWidget";
import tmdb from "../api/tmdb"

const MovieList = () => {
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        const fetchMovies = async() =>{
            const {data}= await tmdb.get("movie/popular")
            setMovies(data.results)
        }

        fetchMovies()
    },[])

    return <View>
        {movies.map((movie, index)=>{
            return <ListWidget name={Object.assign({}, movie)}></ListWidget>
        })}
    </View>
}

export default MovieList;