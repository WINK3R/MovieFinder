import Config from "../constants/config";
import Movie from "../components/Movie";
import {setTrendingMovieList} from "../redux/actions/actionGetTrendingMovie";




export const getTrendingMovieList = () =>{
    // @ts-ignore
    return async dispatch => {
        try {
            const trendingMoviePromise = await fetch(Config.base_url + "trending/all/day?api_key=" + Config.api_key);

            const trendingListJson = await trendingMoviePromise.json();
            console.log('json----------',trendingListJson);
            // @ts-ignore
            const trendingList: Movie[] = trendingListJson.results.map(elt => new Movie(elt["id"],elt["original_title"],elt["poster_path"], elt["runtime"],elt["vote_average"]));
            dispatch(setTrendingMovieList(trendingList));
        } catch (error) {
            console.log('Error----------',error);
        }
    }
}