import AsyncStorage from '@react-native-async-storage/async-storage'
import Movie from "../model/Movie"

export const getFavouriteList = async () => {
    try {
        const value = await AsyncStorage.getItem('favourite');
        if (value === null) {
            return []
        }
        const favouriteList: Movie[] = await JSON.parse(value)
        return favouriteList
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setFavouriteList = async (favouriteList: Movie[]) => {
    try {
        await AsyncStorage.setItem('favourite', JSON.stringify(favouriteList))
    } catch (error) {
        console.log(error)
    }
}

export const getWatchLaterList = async () => {
    try {
        const value = await AsyncStorage.getItem('watchLater')
        if (value === null) {
            return []
        }
        const watchLaterList: Movie[] = await JSON.parse(value)
        return watchLaterList
    } catch (error) {
        console.log(error)
        return null
    }
};

export const setWatchLaterList = async (watchLaterList: Movie[]) => {
    try {
        await AsyncStorage.setItem('watchLater', JSON.stringify(watchLaterList))
    } catch (error) {
        console.log(error)
    }
}

export const getMovieList = async () => {
    try {
        const value = await AsyncStorage.getItem('movie')
        if (value === null) {
            return []
        }
        const movieList: Movie[] = await JSON.parse(value)
        return movieList
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setMovieList = async (movieList: Movie[]) => {
    try {
        await AsyncStorage.setItem('movie', JSON.stringify(movieList))
    } catch (error) {
        console.log(error)
    }
}