// /src/models/Slider.js
import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  src: { type: String, required: true }, // Đường dẫn ảnh
  alt: { type: String }, // Mô tả ảnh (tuỳ chọn)
  order: { type: Number, default: 0 }, // Thứ tự hiển thị
});

export default mongoose.models.Slider || mongoose.model("Slider", SliderSchema);
