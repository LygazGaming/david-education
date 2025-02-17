import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import newsRoutes from "./Routes/News.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return true;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
};

// Test routes
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/test", async (req, res) => {
  try {
    const dbStatus = await connectDB();
    res.json({
      message: "Test API is working",
      database: dbStatus ? "Connected" : "Connection failed",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// News routes
app.use("/api/news", newsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

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
