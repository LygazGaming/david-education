import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "Xin chào",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
