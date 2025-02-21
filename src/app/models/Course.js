import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  isPopular: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
