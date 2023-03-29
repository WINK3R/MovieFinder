class Movie {

    public poster_path_min : string

    public full_date : string
    constructor(
        public id: number,
        public original_title: string,
        public poster_path: string,
        public runtime: number,
        public vote_average: number,
        public release_date: string,
        public genres: string[],
        public overview: string,
        public backdrop_path: string
    ) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w780' + poster_path;
        this.poster_path_min = 'https://image.tmdb.org/t/p/w185' + poster_path;
        this.runtime = runtime;
        this.release_date = release_date.substring(0, 4);
        this.full_date = release_date;
        this.genres = genres;
        this.overview = overview;
        this.vote_average = vote_average;
        this.backdrop_path = 'https://image.tmdb.org/t/p/original' + backdrop_path;
    }


}

export default Movie;