import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Cấu hình timeout cho MongoDB
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // timeout sau 5 giây
  socketTimeoutMS: 45000, // timeout sau 45 giây
};

// Kiểm tra kết nối MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, MONGODB_OPTIONS);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    return false;
  }
};

// Route test đơn giản
app.get("/api/test", async (req, res) => {
  try {
    res.json({
      message: "API is working",
      env: process.env.NODE_ENV,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route kiểm tra DB
app.get("/api/db-test", async (req, res) => {
  try {
    const dbStatus = await connectDB();
    res.json({
      message: "DB connection test",
      connected: isConnected,
      status: dbStatus,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handler với timeout
const handler = async (req, res) => {
  // Set timeout cho response
  res.setTimeout(10000, () => {
    res.status(504).json({ error: "Request timeout" });
  });

  try {
    return new Promise((resolve) => {
      app(req, res, (err) => {
        if (err) {
          console.error("Express error:", err);
          res.status(500).json({ error: "Internal server error" });
        }
        resolve();
      });
    });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default handler;
