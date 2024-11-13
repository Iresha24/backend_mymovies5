var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };


router.get('/movies', (req, res) => {
        fetch('https://api.themoviedb.org/3/discover/movie', options)
 .then(response => response.json())
 .then((data) => {
    const urlImage ="https://image.tmdb.org/t/p/w500";
    const formatedData = []
    for (const key of data.results) {
        const newMovie = {
            title: key.title,
            overview: key.overview.slice(0,250) +"...",
            poster: urlImage + key.poster_path,
            voteCount: key.vote_count,
            voteAverage: key.vote_average, 
        }
        formatedData.push(newMovie)

 }
   res.json({movies : formatedData});
 });
});
 

module.exports = router;
