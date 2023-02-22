import {
    FETCH_TRENDING_MOVIE,
    FETCH_TRENDING_ID,
    POP_FIRST_TRENDING,
    ADD_WATCHLATER,
    FETCH_WATCHLATER,
} from '../constants';
import config from "../../constants/config";
import Movie from "../../model/Movie";

export const setTrendingID = (TrendingIDList: Movie[]) => {
    return {
        type: FETCH_TRENDING_ID,
        payload: TrendingIDList,
    };
}

export const fetchWatchLater = (WatchLaterList: Movie[]) => {
    return {
        type: FETCH_WATCHLATER,
        payload: WatchLaterList,
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
            Promise.all(idList.map(async elt => {
                try{
                    const infoPromise = await fetch(config.base_url + "movie/"+elt+"?api_key=" + config.api_key);
                    //const infoJson = await infoPromise.json();
                    //console.log('infos---------', infoJson);
                    //MovieList.push(new Movie(infoJson["original_title"], infoJson["poster_path"],infoJson["runtime"], infoJson["vote_average"], infoJson["release_date"]))
                    return infoPromise;
                }catch (err){
                    console.log('ErrorGet---------', err);
                }
            })).then(function (responses){
                Promise.all(responses.map(result=>result.json()))
                    .then(function (elements){
                        elements.map(elt=> {
                            const infoJson = elt;
                            console.log('infos---------', elt);
                            MovieList.push(new Movie(infoJson["original_title"], infoJson["poster_path"],infoJson["runtime"], infoJson["vote_average"], infoJson["release_date"]))
                        })
                        console.log("tortue", MovieList)
                        dispatch(setinfoMovie(MovieList));
                    })

            });

        } catch (error) {
            console.log('Error---------', error);
        }
    }
}

export const removeMovieTrending = (movie: Movie) => {
    return{
        type: POP_FIRST_TRENDING,
        payload: movie
    }
}

export const addMovieToWatchLater = (movie : any) => {
    return{
        type: ADD_WATCHLATER,
        payload: movie
    }
}