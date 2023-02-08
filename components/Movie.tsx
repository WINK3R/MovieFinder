

class Movie {
    id: string
    original_title: string
    poster_path: string
    runtime: number
    vote_average: number
    constructor(id: string, original_title: string, poster_path: string, runtime: number, vote_average: number) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = poster_path;
        this.runtime = runtime;
        this.vote_average = vote_average;
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
