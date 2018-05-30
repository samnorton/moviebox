import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const helper = require('../../helpers/helper_movies');

const MovieListItem = ({movie}) => {
  return (
<div className="col-lg-3 col-md-6 col-sm-12">
    <div className="card">
    <Link to={`/movie/${movie._id}`} ><img className="card-img-top" src={movie.poster_path} /></Link>
        <div className="card-block">
            <h4 className="card-title mt-3">{helper.titleCase(movie.title)}</h4>
            <div className="meta">
                <a>{helper.mappingComma(movie.genre)}</a>
            </div>
            <div className="card-text">
                {helper.getExcerpt(movie.overview)}
            </div>
        </div>
        <div className="card-footer">
            <small>RELEASE DATE: <strong>{movie.release_date}</strong></small>
            <Link to={`/movie/${movie._id}`} ><a className="btn btn-secondary float-right btn-sm">MORE</a></Link>
        </div>
  </div>
</div>
);
};
export default MovieListItem;
