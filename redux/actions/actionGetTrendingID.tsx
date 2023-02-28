import {ADD_FAVOURITE, ADD_WATCHLATER, FETCH_FAVOURITE, FETCH_TRENDING_MOVIE, FETCH_WATCHLATER, POP_FIRST_TRENDING} from '../constants';
import config from "../../constants/config";
import Movie from "../../model/Movie";

/*export const getWatchLaterMovies = (WatchLaterList: Movie[]) => {
    return {
        type: FETCH_WATCHLATER,
        payload: WatchLaterList,
    };
}

export const getFavouriteMovies = (FavouriteList: Movie[]) => {
    return {
        type: FETCH_FAVOURITE,
        payload: FavouriteList,
    };
}*/

export const fetchWatchLater = (WatchLaterList: Movie[]) => {
    return {
        type: FETCH_WATCHLATER,
        payload: WatchLaterList,
    };
}

export const fetchFavourite = (FavouriteList: Movie[]) => {
    return {
        type: FETCH_FAVOURITE,
        payload: FavouriteList,
    };
}

export const getWatchLater = () => {
    const MovieList: Movie[] = [];
    fetchWatchLater(MovieList);
}

export const getFavourite = () => {
    const MovieList: Movie[] = [];
    fetchFavourite(MovieList);
}

export const setinfoMovie = (TrendingMovieList: Movie[]) => {
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
            const idList: String[] = IDListJson.results.map(elt => elt["id"]);
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
                        elements.map(elt => {
                            const infoJson = elt;
                            const genreRow: String[] = [];
                            // @ts-ignore
                            elt["genres"].map(genre => {
                                genreRow.push(genre.name);
                            });

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