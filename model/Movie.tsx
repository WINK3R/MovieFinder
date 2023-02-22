class Movie {
    public original_title: string

    public poster_path: string
    public runtime: number
    public vote_average : number
    public release_date: string
    public overview: string
    public genres: string[]


    constructor(original_title: string, poster_path: string,runtime: number, vote_average: number, release_date : string, genres : string[], overview : string) {
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w780'+poster_path;
        this.runtime = runtime;
        this.vote_average = vote_average;
        this.release_date = release_date;
        this.genres = genres;
        this.overview = overview;
    }




}

export default Movie;