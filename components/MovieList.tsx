import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {ListWidget} from "./ListWidget";
import tmdb from "../api/tmdb"
import axios from "axios";

interface idMovie {
    id: string

}


interface Cast {
    cast: string

}

interface People {
    name: string
    job: string

}

interface Movie {
    id: string
    original_title: string
    poster_path: string
    runtime: number
    vote_average: number

    director: string


}

const opt = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/day',
    headers: {
        Accept: "application/json"
    },
    params: {
        api_key: 'a133422b5b1f22428e8074470d321865'
    }
}
const opt2 = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/day',
    headers: {
        Accept: "application/json"
    },
    params: {
        api_key: 'a133422b5b1f22428e8074470d321865'
    }
}

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const movielist: Movie[] = []

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=a133422b5b1f22428e8074470d321865").then(async (response) => {
            await response.data.results.forEach(async function (id: idMovie) {
                console.log(id.id);
                try {
                    const sheet = await axios.get(`https://api.themoviedb.org/3/movie/${id.id}?api_key=a133422b5b1f22428e8074470d321865&language=en-US`);
                    if (sheet && sheet.status == 200) {
                        movielist.push(sheet.data);
                        setMovies(movielist);


                    }

                } catch (e) {
                    console.log(e);
                }
            })
        })
    }, [])

    useEffect(() => {
        movies.forEach(async function (movie: Movie) {
            console.log("-----------------------------");
            /*console.log(movie);*/
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=a133422b5b1f22428e8074470d321865&language=en-US`).then((response) => {
                response.data.results.forEach(function (cast: Cast) {
                    console.log(cast.cast);
                    try {
                        /*const sheet =  axios.get(`https://api.themoviedb.org/3/movie/${id.id}?api_key=a133422b5b1f22428e8074470d321865&language=en-US`);
                        if (sheet && sheet.status == 200) {
                            movielist.push(sheet.data);
                            setMovies(movielist);


                        }*/

                    } catch (e) {
                        console.log(e);
                    }
                })

            });
        })


    })
    return (
        <FlatList
            data={movies}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ListWidget name={item.original_title}
                                                imageURL={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                                runtime={item.runtime} director={item.director}></ListWidget>}>
        </FlatList>
    )
}

export default MovieList;