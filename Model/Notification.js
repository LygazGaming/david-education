const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "Chào mừng đến với website",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
