class Review {
    public message: string

    public pseudo: string

    public profile_path: string

    public date: string


    constructor(message: string, profile_path: string, date: string, pseudo: string) {
        this.message = message;
        if (profile_path == null) {
            this.profile_path = "https://thumbs.dreamstime.com/b/profil-vectoriel-avatar-par-d%C3%A9faut-utilisateur-179376714.jpg";
        } else if (profile_path.slice(0, 6) === "/https") {
            this.profile_path = profile_path.slice(1, 100);
        } else {
            this.profile_path = 'https://image.tmdb.org/t/p/w185' + profile_path;
        }
        this.date = date.substring(0, 10);
        this.pseudo = pseudo;

    }


}

export default Review;