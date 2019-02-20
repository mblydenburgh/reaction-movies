import TMDB_SECRET from './keys';

const API = {
    //* This function fetchs a small bit of info on recent popular movies
    async fetchMostRecent(){
        console.log(`fetching most recent movies`);
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_SECRET}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        try{
            const response = await fetch(url,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            const {results} = await response.json()
            return results;
        }
        catch(error){
            console.log(error);
        }
    },

    //* This function fetchs more data on an individual movie from TMDB
    async fetchMovie(id){
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_SECRET}`;
        try{
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                }
            });
            const results = await response.json();
            return results;
        }
        catch(error){
            console.log(error);
        }
    },

    //* This function queries the TMDB database based on a query string, and returns the id of results
    async searchForMovie(query){
        const encodedQuery = query.replace(' ','+');
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_SECRET}&query=${encodedQuery}`
        try{
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const {results} = await response.json();
            return results;
        }
        catch(error){
            console.log(error);
        }
    }

}

export default API;