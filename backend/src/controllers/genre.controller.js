const Genre = require('../models/genre.model');

// Retrieve all genres
exports.findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
