import {FETCH_TRENDING_MOVIE, FETCH_TRENDING_ID, POP_FIRST_TRENDING} from '../constants';
import config from "../../constants/config";
import Movie from "../../model/Movie";

export const setTrendingID = (TrendingIDList: Movie[]) => {
    return {
        type: FETCH_TRENDING_ID,
        payload: TrendingIDList,
    };
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
            const IDPromise = await fetch(config.base_url + "trending/movie/day?api_key="+config.api_key);
            const IDListJson = await IDPromise.json();
            // @ts-ignore
            const idList: String[] = IDListJson.results.map(elt => elt["id"]);
            const MovieList: Movie[] = [];
            idList.map(async elt => {
                const infoPromise = await fetch(config.base_url + "movie/"+elt+"?api_key=" + config.api_key);
                const infoJson = await infoPromise.json();
                //console.log('infos---------', infoJson);
                MovieList.push(new Movie(infoJson["original_title"], infoJson["poster_path"],infoJson["runtime"], infoJson["vote_average"], infoJson["release_date"]))
                dispatch(setinfoMovie(MovieList));
            });

        } catch (error) {
            console.log('Error---------', error);
        }
    }
}