class Review {
    public message: string

    public pseudo: string

    public profil_path: string

    public date: string


    constructor(message: string, profil_path: string, date: string, pseudo: string) {
        this.message = message;
        if (profil_path === null) {
            console.log("nulllllllllll")
            this.profil_path = "https://thumbs.dreamstime.com/b/profil-vectoriel-avatar-par-d%C3%A9faut-utilisateur-179376714.jpg";
        } else {
            this.profil_path = 'https://image.tmdb.org/t/p/w500' + profil_path;
        }

        this.date = date.substring(0, 10);
        this.pseudo = pseudo;

    }


}

export default Review;