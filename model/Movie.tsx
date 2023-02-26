class Movie {

    public id: number
    public original_title: string

    public poster_path: string
    public runtime: number
    public vote_average: number
    public release_date: string
    public overview: string
    public genres: string[]


    constructor(original_title: string, poster_path: string, runtime: number, vote_average: number, release_date: string, genres: string[], overview: string, id: number) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w780' + poster_path;
        this.runtime = runtime;
        this.release_date = release_date.substring(0, 4);
        this.genres = genres;
        this.overview = overview;
        this.vote_average = vote_average;
    }


}

export default Movie;