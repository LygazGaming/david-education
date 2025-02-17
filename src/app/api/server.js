import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

// Route root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

// Route test với DB
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const handler = async (req, res) => {
  try {
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
