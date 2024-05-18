const Artist = require('../models/artist.model');

// Retrieve all artists
exports.findAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).send(artists);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
