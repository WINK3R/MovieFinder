import apiTMBD from "../api/tmdb";

class Movie {
    id: string
    original_title: string
    poster_path: string
    runtime: number
    vote_average: number

    director: string | undefined

    constructor(id: string, original_title: string, poster_path: string, runtime: number, vote_average: number, director: string | undefined) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = poster_path;
        this.runtime = runtime;
        this.vote_average = vote_average;
        this.director = director;
    }


}

export interface Cast {
    cast: string

}

export interface People {
    name: string
    job: string

}

export default Movie;
