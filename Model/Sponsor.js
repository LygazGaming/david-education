const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    website: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sponsor', SponsorSchema);