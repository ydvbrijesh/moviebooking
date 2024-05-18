
const Movie = require('../models/movie.model');

// Retrieve all movies or search by status
exports.findAllMovies = async (req, res) => {
    try {
        const { status, title, genres, artists, start_date, end_date } = req.query;
        let query = {};

        if (status) query[status.toLowerCase()] = true;
        if (title) query.title = new RegExp(title, 'i');
        if (genres) query.genres = { $in: genres.split(',') };
        if (artists) query['artists.artistid'] = { $in: artists.split(',').map(Number) };
        if (start_date || end_date) {
            query.release_date = {};
            if (start_date) query.release_date.$gte = new Date(start_date);
            if (end_date) query.release_date.$lte = new Date(end_date);
        }

        const movies = await Movie.find(query).populate('artists');
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Retrieve a single movie by ID
exports.findOne = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId).populate('artists');
        if (!movie) return res.status(404).send({ message: "Movie not found" });
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Retrieve all shows for a specific movie by ID
exports.findShows = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(404).send({ message: "Movie not found" });
        res.status(200).send(movie.shows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


exports.findStatus = async (req, res) => {
    try {
        const { status } = req.query;
        if (status) {
            let status = status.toLowerCase()
            let movies = []
            if (status == "published") {
                movies = await Movie.find({ published: true });
            }
            else {
                movies = await Movie.find({ released: true });
            }
            return res.status(200).json(movies);
        } else {
            const movies = await Movie.find();
            return res.status(200).json(movies);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

