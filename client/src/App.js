import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Styled from 'styled-components';
import Nav from './components/Nav';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieList/MovieDetail';
import Search from './components/Search'
import API from './utils/api';
import './App.css';

class App extends Component {
  state = {
    "movies": [],
    "favorites":[],
  }

  async componentDidMount(){
    //* Call to TMDB to load recent popular movies
    const recentMovies = await API.fetchMostRecent();

    //* Call to to databse to fetch any saved favorites
    const favoritesResponse = await fetch('/saved');
    const favorites = await favoritesResponse.json();

    this.setState({
      movies:recentMovies,
      favorites:favorites
    })
  }

  render() {
    return (
      <Main>
        <Nav />
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={() => <MovieList movies={this.state.movies} landingPage={true} />} />
              <Route exact path='/movie/:id' component={() => <MovieDetail />} />
              <Route exact path='/search' component={() => <Search />} />
              <Route exact path='/saved' component={() => <MovieList movies={this.state.favorites} landingPage={false} />} />
            </Switch>
          </div>
        </Router>
      </Main>
    );
  }
}

export default App;

const Main = Styled.div`
  margin: 1.5rem;
`