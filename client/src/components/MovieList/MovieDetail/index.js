import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import { MoviePoster } from '../Movie';
import API from '../../../utils/api';

class MovieDetail extends Component{
    state = {
        movies:[],
        movie:{},
        saved:false,
    }

    async componentDidMount(){
        const id = window.location.pathname.split("/")[1]
        const movie = await API.fetchMovie(id);
        this.setState({movie:movie});
    }

    handleClick = async (movie) => {
        console.log(`handling click`);
        //if the movie is not favorited, click performs a POST
        if (!this.state.saved){
            try{
                const response = await fetch('https://localhost:3000/save',{
                    method:'POST',
                    body:{
                        movie:movie
                    },
                    mode:"no-cors"
                });
                console.log(response);
            }
            catch(error){
                console.log(error);
            }
        }
        //else, the click performs a DELETE
        else{
            try{
                const response = await fetch('https://localhost:3000/save;',{
                    method:'DELETE',
                    body:{
                        id:movie.id
                    },
                    mode:"no-cors"
                });
                console.log(response);
            }
            catch(error){
                console.log(error);
            }
        }
    }
    
    
    render(){
        const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
        const BACKDROP_PATH = "http://image.tmdb.org/t/p/original";
        const {movie} = this.state;

        return (
            <MovieDiv backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
                <MovieInfo>
                    <Overdrive id={String(movie.id)}>
                        <MoviePoster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                    </Overdrive>
                    <div>
                        <h1>{movie.title}</h1>
                        <h3>{movie.release_date}</h3>
                        <button onClick={()=>this.handleClick(movie)}>Save</button>
                        <p>{movie.overview}</p>
                    </div>
                </MovieInfo>
            </MovieDiv>
        )
    }
}

export default MovieDetail;

const MovieDiv = Styled.div`
    position:relative;
    padding-top:50vh;
    background-size:cover;
    background:url(${props => props.backdrop}) center no-repeat;
`

const MovieInfo = Styled.div`
    background:white;
    text-align:left;
    padding:2rem 10%;
    display:flex;
    > div
        {
            margin-left:20px;
        }
    img
        {
            position:relative;
            top:5px;
        }
`