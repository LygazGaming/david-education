// /src/models/PictureLayout.js
import mongoose from "mongoose";

const MainFeatureSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
});

const MembershipSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  bgColor: { type: String, required: true },
  icon: { type: String }, // Lưu tên icon (faGraduationCap, faUsers, v.v.)
});

const PictureLayoutSchema = new mongoose.Schema({
  mainFeature: { type: MainFeatureSchema, required: true },
  memberships: [{ type: MembershipSchema }],
});

export default mongoose.models.PictureLayout ||
  mongoose.model("PictureLayout", PictureLayoutSchema);
