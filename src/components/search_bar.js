import React, { Component } from 'react';

class SearchBar extends Component{
 constructor(props){
   super(props);
   
   this.state = { term: '' };
   this.onInputChange = this.onInputChange.bind(this);
 }

  render(){
    return (
      <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h5 className="subtitle">THE MOST UPDATED MOVIE DATABASE ONLINE</h5>
        <h1 className="leadtitle">Search For Your Favorite Movies</h1>
        <h4 className="mintitle"> Your excellent choice of source for movies online.</h4>
          <div className="form-group">
            <input type="text" value={this.state.term} onChange={event => this.onInputChange(event.target.value)} className="form-control" id="" placeholder="Enter the title of the movie..." />
          </div>
      </div>
      </div>
    );
  }

  onInputChange(term){
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;