import {
    POP_FIRST_TRENDING,
    FETCH_TRENDING_MOVIE,
    FETCH_TRENDING_ID,
    ADD_WATCHLATER,
    FETCH_WATCHLATER,
    ADD_FAVOURITE,
    FETCH_FAVOURITE
} from "../constants";
import Movie from "../../model/Movie";

const initialState = {
    trendingIDs: [],
    trendingMovies: [],
    watchLaterMovies: [] as Movie[],
    favouriteMovies: [] as Movie[],
}

// @ts-ignore
export default appReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case FETCH_TRENDING_ID:
            // @ts-ignore
            return {...state, trendingIDs: action.payload};
        case FETCH_WATCHLATER:
            // @ts-ignore
            return {...state, watchLaterMovies: action.payload};
        case FETCH_FAVOURITE:
            // @ts-ignore
            return {...state, favouriteMovies: action.payload};
        case FETCH_TRENDING_MOVIE:
            return {...state, trendingMovies: action.payload};
        case POP_FIRST_TRENDING:
            return {...state, trendingMovies: [...state.trendingMovies.filter((item : Movie) => item !== action.payload)]};
        case ADD_WATCHLATER:
            // @ts-ignore
            return {...state,watchLaterMovies: [action.payload,...state.watchLaterMovies]};
        case ADD_FAVOURITE:
            // @ts-ignore
            return {...state, favouriteMovies: [action.payload,...state.favouriteMovies]};
        default:
            return state;
    }

}
