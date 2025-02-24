// /src/models/Video.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  views: { type: String, required: true }, // Lưu dưới dạng chuỗi như "12.5K"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
