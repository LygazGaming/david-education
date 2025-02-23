// /src/models/Registration.js
import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["trial", "course"] }, // Phân biệt loại đăng ký
  studentName: { type: String, required: true },
  birthDate: { type: Date },
  parentName: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  trialSession: { type: String }, // Chỉ dùng cho trial
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Chỉ dùng cho course
  courseTitle: { type: String }, // Lưu tiêu đề học phần (tuỳ chọn)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
