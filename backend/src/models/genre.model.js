const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    genreid: {
        type: Number,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('genre', GenreSchema);
