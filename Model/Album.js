const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    caption: String
});

const AlbumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    photos: [PhotoSchema],
    coverImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);