const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    artistid: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    wiki_url: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: true
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('artist', ArtistSchema);
