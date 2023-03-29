import Movie from "../../model/Movie"
import {describe, expect, test} from '@jest/globals'
import appReducer from "../../redux/reducers/appReducer"
import {ADD_FAVOURITE, ADD_WATCHLATER, FETCH_TRENDING_MOVIE, LOAD_FAVOURITE, LOAD_WATCHLATER, POP_FIRST_TRENDING} from "../../redux/constants"

describe('test null', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should return initial state', () => {
        expect(appReducer(undefined, {})).toEqual(initialState)
    })
})

describe('test ADD_FAVOURITE', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle ADD_FAVOURITE', () => {
        const favourite = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")
        expect(
            appReducer(initialState, {
                type: ADD_FAVOURITE,
                payload: favourite,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [],
            watchLaterMovies: [],
            favouriteMovies: [favourite, ...initialState.favouriteMovies],
        })
    })
})

describe('test ADD_WATCHLATER', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle ADD_WATCHLATER', () => {
        const watchLater = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")
        expect(
            appReducer(initialState, {
                type: ADD_WATCHLATER,
                payload: watchLater,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [],
            watchLaterMovies: [watchLater, ...initialState.watchLaterMovies],
            favouriteMovies: [],
        })
    })
})
/*
        case LOAD_WATCHLATER:
            // @ts-ignore
            return {...state, watchLaterMovies: action.payload};
        case LOAD_FAVOURITE:
            // @ts-ignore
            return {...state, favouriteMovies: action.payload};
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
            return {...state, trendingMovies: [...state.trendingMovies.filter((item: Movie) => item !== action.payload)]};
*/