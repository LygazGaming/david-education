import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// Basic middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Improved database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Test route
app.get("/api/test", async (req, res) => {
  try {
    res.json({
      status: "ok",
      message: "API is working",
      env: process.env.NODE_ENV,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import routes
import newsRoutes from "./Routes/News.js";
import categoryRoutes from "./Routes/Category.js";
import sliderRoutes from "./Routes/Slider.js";
import courseRoutes from "./Routes/Course.js";
import albumRoutes from "./Routes/Album.js";
import videoRoutes from "./Routes/Video.js";
import notificationRoutes from "./Routes/Notification.js";

// Register routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/notification", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Main handler
const handler = async (req, res) => {
  try {
    // Ensure database is connected
    await connectDB();

    // Create a promise that resolves when the request is handled
    return new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) {
          console.error("Express error:", err);
          reject(err);
        }
        resolve();
      });
    });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({
      error: "Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export default handler;
