import mongoose from "mongoose";

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

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
