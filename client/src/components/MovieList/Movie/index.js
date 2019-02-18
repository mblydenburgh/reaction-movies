import React from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components'
import Overdrive from 'react-overdrive';

const Movie = ({movie}) => {
    const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
    return (
        <MovieCard>
            <Link to={`/${movie.id}`}>
                <Overdrive id={movie.id}>
                    <MoviePoster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                </Overdrive>
            </Link>
        </MovieCard>
    )
}

export default Movie;

const MovieCard = Styled.div`
    justify-self: center;
`;

export const MoviePoster = Styled.img`
    box-shadow: 0 0 10px black;
`