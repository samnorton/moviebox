import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Router, Route, Link, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import MovieList from './components/movie_list';
import MovieDetail from './components/movie_detail';
import MovieTopBar from './components/movie_top_bar';
import MovieFooter from './components/movie_footer';

const Content = (props) => {
  const {children} = props;
  return(
    <BrowserRouter
      basename={'/'}
    >
    <div>{children}</div>
    </BrowserRouter>
  );
};

class App extends Component{
 constructor(props){
   super(props);

   this.state = { 
     movies: [],
  };
 }
 componentDidMount() {
  this.getAllMovies();
}
getAllMovies() {
  fetch('/movies')
  .then((resp) => resp.json())
  .then(movies => this.setState({
      movies: movies
  }))
  .catch((err) => console.log(err));
}

getMovieByTitle(term) {
  axios.get('/moviesbytitle', {
      params: {
          term: term
      }
  })
  .then(movies => this.setState({
      movies: movies.data
  }))
  .then(() => console.log('this is is a state >>>>+++', this.state))
  .catch((err) => console.log(err));
}

movieSearch(term) {
  // remember prevents blank spaces
  const currentTerm = term.trim();

  // remember clear last getMovieByTitle call
  if (this.timer) {
      clearTimeout(this.timer);
  }

  // if term is empty, so call getAllMovies again
  // prevent call cache movies, because cache movie will always return the first call
  // but won't render new movies if exists
  if (!currentTerm) {
      return this.getAllMovies();
  }

  this.timer = setTimeout(() => { this.getMovieByTitle(currentTerm); }, 300);
}

  render(){
   const movieSearch = _.debounce((term) => { this.movieSearch(term) }, 300);

  return (
    <div>  
      <Route exact path={'/'} children={() => <MovieTopBar />} /> 
      <Route exact path={'/'} render={() => <div><SearchBar onSearchTermChange={movieSearch} />
      <MovieList movies={this.state.movies} /></div>} /> 
      <Route exact path={'/movie/:id'} render={(props) => <MovieDetail {...props}/>} />
      <Route exact path={'/'} children={() => <MovieFooter />} /> 
    </div>
  );
}
};

ReactDOM.render(<Content><App /></Content>,  document.getElementById('app'));


