import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

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
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
};

// Import News routes
import newsRoutes from "./Routes/News.js";

// Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
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

// Add News routes
app.use("/api/news", newsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const handler = async (req, res) => {
  try {
    await connectDB(); // Ensure DB is connected before handling request
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
