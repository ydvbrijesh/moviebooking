const express = require('express');
const router = express.Router();
const genres = require('../controllers/genre.controller.js');



router.get('/genres', genres.findAllGenres);


module.exports = router;
