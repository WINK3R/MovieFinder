import {ADD_FAVOURITE, ADD_WATCHLATER, FETCH_TRENDING_MOVIE, LOAD_FAVOURITE, LOAD_WATCHLATER, POP_FIRST_TRENDING} from '../constants'
import config from "../../constants/config"
import Movie from "../../model/Movie"
import {getFavouriteList, getWatchLaterList} from "../../storage/storage"



export const setWatchLater = (TrendingMovieList: null | Movie[]) => {
    return {
        type: LOAD_WATCHLATER,
        payload: TrendingMovieList,
    }
}

export const setFavourite = (FavouriteList: null | Movie[]) => {
    return {
        type: LOAD_FAVOURITE,
        payload: FavouriteList,
    }
}


export const getWatchLater = () => {
    // @ts-ignore
    return async dispatch => {
        try {
            let MovieList = await getWatchLaterList();
            dispatch(setWatchLater(MovieList));


        } catch (error) {
            console.log('Error', error);
        }
    }
}



export const getFavourite = () => {
    // @ts-ignore
    return async dispatch => {
        try {
            let MovieList = await getFavouriteList();
            dispatch(setFavourite(MovieList));


        } catch (error) {
            console.log('Error', error);
        }
    }
}
export const setinfoMovie = (TrendingMovieList: null | Movie[]) => {
    return {
        type: FETCH_TRENDING_MOVIE,
        payload: TrendingMovieList,
    };
}

export const getTrendingID = () => {
    // @ts-ignore
    return async dispatch => {
        try {
            const IDPromise = await fetch(config.base_url + "trending/movie/day?api_key=" + config.api_key);
            const IDListJson = await IDPromise.json();
            // @ts-ignore
            const idList: string[] = IDListJson.results.map(elt => elt["id"]);
            const MovieList: Movie[] = [];
            Promise.all(idList.map(async elt => {
                try {
                    return await fetch(config.base_url + "movie/" + elt + "?api_key=" + config.api_key + "&language=fr-FR");
                } catch (err) {
                    console.log('Error', err);
                }
            })).then(function (responses) {
                // @ts-ignore
                Promise.all(responses.map(result => result.json()))
                    .then(function (elements) {
                        elements.forEach(elt => {
                            const infoJson = elt;
                            const genreRow: string[] = [];
                            // @ts-ignore
                            elt["genres"].map(genre => {
                                genreRow.push(genre.name);
                            });

                            console.log(new Movie(infoJson["id"], infoJson["title"], infoJson["poster_path"], infoJson["runtime"], infoJson["vote_average"], infoJson["release_date"], genreRow, infoJson["overview"], infoJson["backdrop_path"]))
                            // @ts-ignore
                            MovieList.push(new Movie(infoJson["id"], infoJson["title"], infoJson["poster_path"], infoJson["runtime"], infoJson["vote_average"], infoJson["release_date"], genreRow, infoJson["overview"], infoJson["backdrop_path"]))
                        })
                        try {
                            dispatch(setinfoMovie(MovieList));
                        } catch (err) {
                            console.log('Error', err);
                        }
                    })

            });

        } catch (error) {
            console.log('Error', error);
        }
    }
}

export const removeMovieTrending = (movie: Movie) => {
    return {
        type: POP_FIRST_TRENDING,
        payload: movie
    }
}

export const addMovieToWatchLater = (movie: Movie) => {
    return {
        type: ADD_WATCHLATER,
        payload: movie
    }
}

export const addMovieToFavourite = (movie: Movie) => {
    return {
        type: ADD_FAVOURITE,
        payload: movie
    }
}