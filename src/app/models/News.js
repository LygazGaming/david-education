// /src/models/News.js
import mongoose from "mongoose";
import slugify from "slugify"; // Cần cài: npm install slugify

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true, maxLength: 300 },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  slug: { type: String, unique: true }, // Thêm slug, không bắt buộc nhưng unique
  createdAt: { type: Date, default: Date.now },
});

// Tự động tạo slug trước khi lưu
NewsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
