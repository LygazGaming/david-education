// /src/models/Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Tên danh mục, ví dụ: "Tin tức", "Sự kiện"
  slug: { type: String, required: true, unique: true }, // Định dạng URL, ví dụ: "tin-tuc", "su-kien"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
