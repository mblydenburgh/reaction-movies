import React from 'react';
import Styled from 'styled-components';
import Movie from './Movie';
import Jumbotron from '../Jumbotron';

const MovieList = ({movies,landingPage}) => {
    
    const renderMovies = movies => movies.map(movie => ( 
            <Movie key={movie.id} movie={movie} />
    )) 

    
    return (
        <div>
            {landingPage?<Jumbotron title={"React(ion) Movies"} subtitle={"Powered by The Movie Database"} />:null} 
            <List>
                {renderMovies(movies)} 
            </List>
        </div>
    )
}

export default MovieList;

const List = Styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    padding: 1rem;
    justify-content: center;
    grid-gap: 20px;
`