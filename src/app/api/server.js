import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Chỉ giữ một route test đơn giản
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working",
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI ? "Configured" : "Missing",
  });
});

// Simplified handler
const handler = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      app(req, res, (err) => {
        if (err) reject(err);
        resolve();
      });
    } catch (error) {
      console.error("Handler error:", error);
      res.status(500).json({ error: "Internal Server Error" });
      resolve();
    }
  });
};

export default handler;
