import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    // Ensure no index: true here
  },
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Keep only necessary indexes
NewsSchema.index({ title: "text", excerpt: "text" });
NewsSchema.index({ category: 1, createdAt: -1 });
// Skip the line below because slug already has unique: true
// NewsSchema.index({ slug: 1 });

export default mongoose.models.News || mongoose.model("News", NewsSchema);
