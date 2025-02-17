const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true, maxLength: 300 },
  content: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    // Đảm bảo không có index: true ở đây
  },
  date: { type: Date, required: true },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Chỉ giữ lại những index cần thiết
NewsSchema.index({ title: "text", excerpt: "text" });
NewsSchema.index({ category: 1, createdAt: -1 });
// Bỏ dòng này vì slug đã có unique: true
// NewsSchema.index({ slug: 1 });

module.exports = mongoose.model("News", NewsSchema);
