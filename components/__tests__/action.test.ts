import Movie from "../../model/Movie"
import {describe, expect} from '@jest/globals'
import {addMovieToFavourite, addMovieToWatchLater, removeMovieTrending, setFavourite, setinfoMovie, setWatchLater} from "../../redux/actions/actions"
import {ADD_FAVOURITE, ADD_WATCHLATER, FETCH_TRENDING_MOVIE, LOAD_FAVOURITE, LOAD_WATCHLATER, POP_FIRST_TRENDING} from "../../redux/constants"

describe('test actions add WatchLater', () => {

    it('should create an action with ADD_WATCHLATER type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: ADD_WATCHLATER,
            payload: payload

        };

        expect(addMovieToWatchLater(payload)).toEqual(expectation);
    });
})

describe('test actions add Favourite', () => {

    it('should create an action with ADD_FAVOURITE type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: ADD_FAVOURITE,
            payload: payload

        };

        expect(addMovieToFavourite(payload)).toEqual(expectation);
    });
})


describe('test actions load watchlater', () => {

    it('should create an action with ADD_FAVOURITE type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: LOAD_WATCHLATER,
            payload: [payload]

        };

        expect(setWatchLater([payload])).toEqual(expectation);
    });
})

describe('test actions load favourite', () => {

    it('should create an action with LOAD_FAVOURITE type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: LOAD_FAVOURITE,
            payload: [payload]

        };

        expect(setFavourite([payload])).toEqual(expectation);
    });
})


describe('test actions load info movies', () => {

    it('should create an action with FETCH_TRENDING_MOVIE type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: FETCH_TRENDING_MOVIE,
            payload: [payload]

        };

        expect(setinfoMovie([payload])).toEqual(expectation);
    });
})


describe('test actions remove movies', () => {

    it('should create an action with removeMovieTrending type', () => {
        const payload = new Movie(
            916224,
            "Suzume",
            "https://image.tmdb.org/t/p/original/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
            121,
            8.311,
            "2022-11-11",
            [
                "Animation",
                "Drame",
                "Aventure",
                "Fantastique",
            ],



            "Dans une petite ville paisible de Kyushu, une jeune fille de 17 ans, Suzume, rencontre un homme qui dit voyager afin de chercher une porte. Décidant de le suivre dans les montagnes, elle découvre une unique porte délabrée trônant au milieu des ruines, seul vestige ayant survécu au passage du temps. Cédant à une inexplicable impulsion, Suzume tourne la poignée, et d'autres portes s'ouvrent alors aux quatre coins du Japon, laissant entrer toutes les catastrophes qu'elles renferment. L'homme est formel : toute porte ouverte doit être fermée. Là où elle s'est égarée se trouvent les étoiles, le crépuscule et l'aube, une voûte céleste où tous les temps se confondent. Guidée par des portes nimbées de mystère, Suzume entame un périple en vue de toutes les refermer.",
            "https://image.tmdb.org/t/p/w780/hOJYwkVSgXtE3BJFN0bRPKdLJLj.jpg",


        )
        const expectation = {
            type: POP_FIRST_TRENDING,
            payload: payload

        };

        expect(removeMovieTrending(payload)).toEqual(expectation);
    });
})





