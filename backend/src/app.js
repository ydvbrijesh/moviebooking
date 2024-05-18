const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongodb = require('./config/db.config.js');
const userRoutes = require('./routes/user.routes.js');
const movieRoutes = require('./routes/movie.routes');
const genreRoutes = require('./routes/genre.routes');
const artistRoutes = require('./routes/artist.routes');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8085;

app.get('/', (req, res) => {
    res.send({
        status: "ok",
        message: "Movie booking application"
    });
});

// Mounting the routes with appropriate base paths
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.use('/api', genreRoutes);
app.use('/api', artistRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
    mongodb()
});
