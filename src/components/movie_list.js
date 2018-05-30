import React from 'react';
import MovieListItem from './movie_list_item';

const MovieList = (props) => {

const movieItems = props.movies.map((movie) => {
  return <MovieListItem key={movie._id} movie={movie} />
});

  return(
    <div className="container">
    <h2 className="latest">MOVIE RESULTS</h2>
    <div className="row">
      { movieItems }
    </div>
    </div>
  );
};

export default MovieList;


