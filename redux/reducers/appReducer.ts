import {FETCH_TRENDINGMOVIE} from "../constants";


const initialState = {
    trendingMovies : [],
    favoriteMovies : [],
    watchLaterMovies : [],
}

// @ts-ignore
export default appReducer = (state = initialState, action)=> {
    switch (action.type){
        case FETCH_TRENDINGMOVIE:
            // @ts-ignore
            return {...state, trendingMovies: action.payload};
        default:
            return state;
    }
}