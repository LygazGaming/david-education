import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Slider || mongoose.model("Slider", SliderSchema);
