import {FETCH_TRENDINGMOVIE} from '../constants';
import Movie from "../../components/Movie";

export const setTrendingMovieList = (trendingList: Movie[])=> {
    return {
        type: FETCH_TRENDINGMOVIE,
        payload: trendingList,

    };
}
