import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true, maxLength: 300 },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
