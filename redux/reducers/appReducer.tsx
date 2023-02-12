import {POP_FIRST_TRENDING, FETCH_TRENDING_MOVIE,FETCH_TRENDING_ID} from "../constants";

const initialState = {
    trendingIDs: [],
    trendingMovies: [],
}

// @ts-ignore
export default appReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRENDING_ID:
            // @ts-ignore
            return {...state, trendingIDs: action.payload};
        case FETCH_TRENDING_MOVIE:
            return {...state, trendingMovies: action.payload};
        case POP_FIRST_TRENDING:
            return {...state, trendingMovies: state.trendingMovies.pop()};
        default:
            return state;
    }

}