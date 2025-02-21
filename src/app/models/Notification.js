import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
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
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
