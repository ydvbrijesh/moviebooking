const express = require('express');
const router = express.Router();
const artists = require('../controllers/artist.controller.js');


router.get('/artists', artists.findAllArtists);

module.exports = router;
