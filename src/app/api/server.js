import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import newsRoutes from "./Routes/News.js";
import notificationRoutes from "./Routes/Notification.js";
import categoryRoutes from "./Routes/Category.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return true;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối tới MongoDB");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
};

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/notification", notificationRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy đường dẫn!" });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
  });
}

// Vercel handler
const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
