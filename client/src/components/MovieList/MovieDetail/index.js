import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import { MoviePoster } from '../Movie';
import API from '../../../utils/api';
import { object } from 'prop-types';

class MovieDetail extends Component{
    state = {
        movies:[],
        movie:{},
        saved:false,
    }

    checkFavorites = (favArray) => {
        return favArray.some(favorite => {
            console.log(`favorite id: ${favorite.id} / movie id:${window.location.pathname.split("/")[2]}`);
            return favorite.id === Number(window.location.pathname.split("/")[2])
        })
    }

    async componentDidMount(){
        //Get current id for movie from browser path
        const id = window.location.pathname.split("/")[2]
        console.log(`Movie id: ${id}`);
        //Check to see if the movie is currently favorited
        const dbResponse = await fetch(`/api/movie/${id}`,{
            method:"GET",
        });
        console.log(dbResponse);
        const data = await dbResponse.json();
        console.log(`Data-`);
        console.log(data);
        //If the database returns an empty object, it is not favorited. TMDB to be called for movie data
        let movie;
        if(this.checkFavorites(this.props.favorites)){
            console.log(`using database info`);
            movie = data;
            this.setState({saved:true})
        }
        else{
            console.log(`fetching from TMDB`);
            movie = await API.fetchMovie(id);
        }

        this.setState({movie:movie});
    }



    handleClick = async (movie) => {
        //if the movie is not favorited, click performs a POST
        if (!this.state.saved){
            try{
                const response = await fetch('/api/save',{
                    method:'POST',
                    body:JSON.stringify({
                        movie
                    }),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                this.setState({saved:true});
                // console.log(response);
            }
            catch(error){
                console.log(error);
            }
        }
        //else, the click performs a DELETE
        else{
            try{
                const response = await fetch(`/api/movie/${movie.id};`,{
                    method:'DELETE',
                    body:{
                        id:movie.id
                    },
                });
                this.setState({saved:false});
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

        //Change button text depending on "saved" state
        let buttonText
        if(this.state.saved){
            buttonText = "Remove Favorite";
        }
        else{
            buttonText = "Save";
        }

        return (
            <div>
                <MovieBackdrop backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}></MovieBackdrop>
                <MovieDiv>
                    <MovieInfo>
                        <Overdrive id={String(movie.id)}>
                            <MoviePoster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                        </Overdrive>
                        <div>
                            <h1>{movie.title}</h1>
                            <h3>{movie.release_date}</h3>
                            <button onClick={()=>this.handleClick(movie)}>{buttonText}</button>
                            <p>{movie.overview}</p>
                        </div>
                    </MovieInfo>
                </MovieDiv>
            </div>
        )
    }
}

export default MovieDetail;

const MovieBackdrop = Styled.div`
    background-size: cover;
    background:url(${props => props.backdrop}) center center no-repeat;
    min-height: 600px;
    margin: 1rem;
    border-radius: 5px;
`

const MovieDiv = Styled.div`
    position:relative;
    background-size:contain;
    margin: 1rem;
`

const MovieInfo = Styled.div`
    background:#222;
    color: #fff;
    text-align:left;
    padding:2rem 10%;
    display:flex;
    > div
        {
            margin-left:20px;

            >p{
                font-size: 1.2rem; 
            }
        }
    >img
        {
            position:relative;
            top:5px;
        }
`