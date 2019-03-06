import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Styled from 'styled-components';
import API from '../../utils/api';
import MovieList from '../MovieList';

class Search extends Component{
    state={
        title:'',
        movies:[]
    }
    

    //! why does function have to be written like this and not...
    //! handleChange = (name,event) => {}?
    handleChange = name => event => {
        this.setState({title:event.target.value})
    }

    handleClick = async () => {
        const movies = await API.searchForMovie(this.state.title);
        this.setState({movies:movies});
    }

    render(){
        return(
            <div>
                <SearchDiv>
                    <h3>Search for a Movie</h3>
                    <TextField 
                    id='movie-seach-input'
                    label='Title Search'
                    onChange={this.handleChange('title')} />
                    <Button 
                    variant='contained'
                    onClick={this.handleClick}>
                        Search
                    </Button>
                </SearchDiv>
                {(this.state.movies.length>0)?<MovieList movies={this.state.movies} landingPage={false} />:null}
            </div>
        )
    }
}

export default Search;

const SearchDiv = Styled.div`
    text-align:center;
`

