import {POP_FIRST_TRENDING, FETCH_TRENDING_MOVIE, FETCH_TRENDING_ID, ADD_WATCHLATER, FETCH_WATCHLATER} from "../constants";
import Movie from "../../model/Movie";
const initialState = {
    trendingIDs: [],
    trendingMovies: [],
    watchLaterMovies: [],
}

// @ts-ignore
export default appReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRENDING_ID:
            // @ts-ignore
            return {...state, trendingIDs: action.payload};
        case FETCH_WATCHLATER:
            // @ts-ignore
            return {...state, watchLaterMovies: action.payload};
        case FETCH_TRENDING_MOVIE:
            return {...state, trendingMovies: action.payload};
        case POP_FIRST_TRENDING:
            return {...state, trendingMovies: [...state.trendingMovies.filter((item : Movie) => item !== action.payload)]};
        case ADD_WATCHLATER:
            // @ts-ignore
            return {...state,trendingMovies:action.payload};
        default:
            return state;
    }

}
