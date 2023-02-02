import axios from "axios";
import {Cast, People} from "../components/Movie";
import Movie from "../components/Movie";
import Config from "../constants/config";

interface idMovie {
    id: string

}


class apiTMBD {


    async getTrendingMovie() {
        const movielist: string[] = [];
        try {
            axios.get(Config.base_url + "trending/all/day?api_key=" + Config.api_key).then(async (response) => {
                await response.data.results.forEach(async function (id: idMovie) {
                    movielist.push(id.id);
                    console.log(id.id);
                    return movielist;

                })
            })
        } catch (err) {
            return movielist;
        }
        return [];


    }

    async getInfoMovie(id: string) {
        try {
            axios.get<Movie>(Config.base_url + "movie/" + id + "?api_key=" + Config.api_key).then(async (response) => {
                let director = await this.getDirector(response.data.id);
                console.log("----------");
                console.log(director);
                console.log("----------");
            })


            /*let newmovie = new Movie(movie.id, movie.original_title, movie.poster_path, movie.runtime, movie.vote_average, director)
            console.log(newmovie);*/
            return null;
        } catch (err) {
            return null;
        }
    }


    async getDirector(id: string): Promise<string | undefined> {
        try {
            const {data: cast} = await axios.get(Config.base_url + "movie/" + id + "/credits?api_key=" + Config.api_key);
            cast.crew.forEach((people: People) => {
                if (people.job == "Director") {
                    console.log(people.name);

                    return people.name;
                }

            })
        } catch (err) {
            return undefined;
        }


    }


}


export default apiTMBD;
