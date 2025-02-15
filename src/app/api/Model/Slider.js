const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Slider", SliderSchema);
