const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coach', CoachSchema);