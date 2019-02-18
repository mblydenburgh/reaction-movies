import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Styled from 'styled-components';
import Nav from './components/Nav';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieList/MovieDetail';
import Search from './components/Search'
import API from './utils/api';

class App extends Component {
  state = {
    "movies": [],
  }

  async componentDidMount(){
    const recentMovies = await API.fetchMostRecent();
    console.log(recentMovies);
    this.setState({movies:recentMovies})
  }

  //! Why does the search compoent not render when placed below the movie detail component?
  render() {
    return (
      <Main>
        <Nav />
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={() => <MovieList movies={this.state.movies} landingPage={true} />} />
              <Route exact path='/search' component={() => <Search />} />
              <Route exact path='/:id' component={() => <MovieDetail />} />
              {/* <Route exact path='/saved' component={} /> */}
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