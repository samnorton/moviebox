const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/movies');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Schema Setup
var movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  poster_path: String,
  overview: String,
  release_date: String,
  genre: Array
});

// Define the model
var movie = mongoose.model('movie', movieSchema);

// insert data inside mongo
// movie.create({
//   title: "Avatar",
//    poster_path: "https://bit.ly/2GTsTJ9",
//    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
//    release_date: "2009-12-10",
//    genre: [
//       "Action",
//       "Adventure",
//       "Fantasy"
//    ]
// }, function(err, movie){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('newly created movie');
//     console.log(movie);
//   }
// }

// );


app.get('/movies', function(req, res){
  movie.find({}, function(err, allMovies){
  if(err){
  console.log(err);
  } else {
  res.json(allMovies);
  }
  }).limit(8).sort({title: -1}) 
  });

  app.get('/moviesbytitle', function(req, res){
    var query = req.query.term.toLowerCase();
    movie.find({ title: query }, function(err, allMovies){
      if(err){
      console.log(err);
      } else {
      res.json(allMovies);
      }
  }) 
    console.log(req.query.term);
  });


  app.get('/moviesbyid', function(req, res){
    var query = req.query.id;

    movie.findById({ _id: query }, function(err, allMovies){
      if(err){
      console.log(err);
      } else {
      res.json(allMovies);
      }
  }) 

  });
  
  
  app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running!');
  });