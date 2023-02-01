import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        Accept: "application/json"
    },
    params: {
        api_key: 'a133422b5b1f22428e8074470d321865'
    }
})