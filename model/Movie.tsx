class Movie {
    public id: number
    public original_title: string

    public poster_path: string

    public poster_path_min: string
    public runtime: number
    public vote_average: number
    public release_date: string
    public overview: string
    public genres: string[]

    public backdrop_path: string


    constructor(id: number, original_title: string, poster_path: string, runtime: number, vote_average: number, release_date: string, genres: string[], overview: string, backdrop_path: string) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w780' + poster_path;
        this.poster_path_min = 'https://image.tmdb.org/t/p/w500' + poster_path;
        this.runtime = runtime;
        this.release_date = release_date.substring(0, 4);
        this.genres = genres;
        this.overview = overview;
        this.vote_average = vote_average;
        this.backdrop_path = 'https://image.tmdb.org/t/p/w780' + backdrop_path;
    }


}

export default Movie;