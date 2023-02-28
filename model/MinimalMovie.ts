class MinimalMovie {
    public original_title: string

    public poster_path: string


    constructor(original_title: string, poster_path: string) {
        this.original_title = original_title;
        this.poster_path = 'https://image.tmdb.org/t/p/w185' + poster_path;

    }


}

export default MinimalMovie;