import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import newsRoutes from "./Routes/News.js";
import notificationRoutes from "./Routes/Notification.js";
import categoryRoutes from "./Routes/Category.js";
// import sliderRoutes from "./Routes/Slider.js";
// import courseRoutes from "./Routes/Course.js";
// import albumRoutes from "./Routes/Album.js";
// import videoRoutes from "./Routes/Video.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

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

// API Routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
// app.use("/api/slider", sliderRoutes);
// app.use("/api/course", courseRoutes);
// app.use("/api/album", albumRoutes);
// app.use("/api/video", videoRoutes);
app.use("/api/notification", notificationRoutes);

// API handler cho Vercel
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
