class Movie {
    original_title: string

    poster_path: string
    runtime: number
    vote_average : number
    release_date: string

    constructor(original_title: string, poster_path: string,runtime: number, vote_average: number, release_date : string) {
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w500'+poster_path;
        this.runtime = runtime;
        this.vote_average = vote_average;
        this.release_date = release_date;
    }



}

export default Movie;