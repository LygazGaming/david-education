import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Database connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return true;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối tới MongoDB");
    return true;
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    return false;
  }
};

// Import routes
import newsRoutes from "./Routes/News.js";
import categoryRoutes from "./Routes/Category.js";
import sliderRoutes from "./Routes/Slider.js";
import courseRoutes from "./Routes/Course.js";
import albumRoutes from "./Routes/Album.js";
import videoRoutes from "./Routes/Video.js";
import notificationRoutes from "./Routes/Notification.js";

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Đăng ký Routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/notification", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Đã xảy ra lỗi!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy đường dẫn!" });
});

// Handler function
const handler = async (req, res) => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return res
        .status(500)
        .json({ message: "Không thể kết nối đến database" });
    }
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

export default handler;
