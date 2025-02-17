const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    duration: {
      type: Number, // số tháng
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
