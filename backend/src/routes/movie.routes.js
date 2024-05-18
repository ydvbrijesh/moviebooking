const express = require('express');
const router = express.Router();
const movies = require('../controllers/movie.controller.js');



router.get('/movies', movies.findAllMovies);
router.get('/movies/:movieId', movies.findOne);
router.get('/movies/:movieId/shows', movies.findShows);
router.get('/movies/:status', movies.findStatus);

module.exports = router;
