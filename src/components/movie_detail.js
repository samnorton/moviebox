import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as helper from '../../helpers/helper_movies';
class MovieDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      movie: {}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
   
    axios.get('/moviesbyid', {
      params: {
          id: id
      }
   })
  .then(movie => this.setState({
      loading: false, 
      movie: movie.data
  }))
  .then(() => console.log('this is is a state >>>>+++', this.state))
  .catch((err) => console.log(err));
  }

  render(){
  if(this.state.loading){
    return null;
  } 

  const movie = this.state.movie;
  return (
    <div className="container">
    <div className="row bg-gray">
            <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={movie.poster_path} alt="" className="img-thumbnail"/>
            </div>
            <div className="col-lg-9 col-md-6 col-sm-12 add-margin-detail">
                <h4 className="movie-detail"><strong>MOVIE ID:</strong> {movie._id}</h4>
                <h4 className="movie-detail"><strong>MOVIE TITLE:</strong> {movie.title}</h4>
                <h4 className="movie-detail"><strong>OVERVIEW:</strong> {movie.overview}</h4>
                <h4 className="movie-detail"><strong>RELEASE DATE:</strong> {movie.release_date}</h4>
                <h4 className="movie-detail"><strong>GENRE:</strong>  {helper.mappingComma(movie.genre)}</h4>
            </div>
  </div>
  <div className="row">
        <div className="col-lg-12">
                <Link to='/' ><button type="button" className="btn float-right btn-secondary btn-lg mx-auto">BACK TO MAIN PAGE &rarr;</button></Link>
        </div>
    </div>
</div>
  );
}
};

export default MovieDetail;