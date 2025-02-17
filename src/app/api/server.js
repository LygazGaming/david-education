import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    console.log("Đã kết nối tới MongoDB");
    await mongoose.connect(process.env.MONGO_URI);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Import routes
import newsRoutes from "./Routes/News.js";
import categoryRoutes from "./Routes/Category.js";
import sliderRoutes from "./Routes/Slider.js";
import courseRoutes from "./Routes/Course.js";
import albumRoutes from "./Routes/Album.js";
import videoRoutes from "./Routes/Video.js";
import notificationRoutes from "./Routes/Notification.js";

// Đăng ký Routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/notification", notificationRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy đường dẫn!" });
});

// Thay thế app.listen bằng handler function cho Vercel
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

export default handler;
