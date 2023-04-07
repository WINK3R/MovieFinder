import Movie from "../../model/Movie"
import {describe, expect} from '@jest/globals'
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

describe('test LOAD_WATCHLATER', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle LOAD_WATCHLATER', () => {
        const watchLater = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")
        const MovieList = [watchLater]
        expect(
            appReducer(initialState, {
                type: LOAD_WATCHLATER,
                payload: MovieList,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [],
            watchLaterMovies: [watchLater, ...initialState.watchLaterMovies],
            favouriteMovies: [],
        })
    })
})

describe('test LOAD_FAVOURITE', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle LOAD_FAVOURITE', () => {
        const favourite = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")
        const MovieList = [favourite]
        expect(
            appReducer(initialState, {
                type: LOAD_FAVOURITE,
                payload: MovieList,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [],
            watchLaterMovies: [],
            favouriteMovies: [favourite, ...initialState.favouriteMovies],
        })
    })
})

describe('test FETCH_TRENDING_MOVIE', () => {

    let initialState = {
        trendingIDs: [],
        trendingMovies: [],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle FETCH_TRENDING_MOVIE', () => {
        const trending = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")
        const MovieList = [trending]
        expect(
            appReducer(initialState, {
                type: FETCH_TRENDING_MOVIE,
                payload: MovieList,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [trending, ...initialState.trendingMovies],
            watchLaterMovies: [],
            favouriteMovies: [],
        })
    })
})

describe('test POP_FIRST_TRENDING', () => {

    const trending = new Movie(1, "Test", "", 1, 5, "2023", ["Halloween"], "", "")

    let initialState = {
        trendingIDs: [],
        trendingMovies: [trending],
        watchLaterMovies: [],
        favouriteMovies: [],
    }

    it('should handle POP_FIRST_TRENDING', () => {
        expect(
            appReducer(initialState, {
                type: POP_FIRST_TRENDING,
                payload: trending,
            })
        ).toEqual({
            trendingIDs: [],
            trendingMovies: [...initialState.trendingMovies.filter((item: Movie) => item !== trending)],
            watchLaterMovies: [],
            favouriteMovies: [],
        })
    })
})
/*
        case POP_FIRST_TRENDING:
            return {...state, trendingMovies: [...state.trendingMovies.filter((item: Movie) => item !== action.payload)]};
*/