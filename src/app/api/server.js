import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Routes
import newsRoutes from "./Routes/News.js";
import categoryRoutes from "./Routes/Category.js";
import sliderRoutes from "./Routes/Slider.js";
import courseRoutes from "./Routes/Course.js";
import albumRoutes from "./Routes/Album.js";
import videoRoutes from "./Routes/Video.js";
import notificationRoutes from "./Routes/Notification.js";

// Cấu hình __dirname cho ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// MongoDB connection với retry
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      if (mongoose.connections[0].readyState) {
        console.log("Đã kết nối MongoDB");
        return true;
      }

      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      console.log("Kết nối MongoDB thành công");
      return true;
    } catch (error) {
      retries -= 1;
      console.error(
        `Lỗi kết nối MongoDB (còn ${retries} lần thử):`,
        error.message
      );
      if (retries === 0) return false;
      // Đợi 1 giây trước khi thử lại
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return false;
};

// API Health check
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus = await connectDB(1);
    res.json({
      status: "ok",
      database: dbStatus ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Register routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/notification", notificationRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Multer error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File quá lớn. Giới hạn là 5MB",
      });
    }
    return res.status(400).json({
      message: "Lỗi upload file",
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message:
      process.env.NODE_ENV === "development" ? err.message : "Đã có lỗi xảy ra",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Không tìm thấy đường dẫn",
    path: req.path,
  });
});

// Vercel handler
const handler = async (req, res) => {
  try {
    // Ensure database connection
    const dbConnected = await connectDB();
    if (!dbConnected) {
      return res.status(500).json({
        message: "Không thể kết nối đến database",
      });
    }

    // Handle request
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default handler;
