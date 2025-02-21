import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  description: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
