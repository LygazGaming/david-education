import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Route root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

// Route test
app.get("/api/test", (req, res) => {
  res.json({ message: "Test API is working" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const handler = (req, res) => {
  return app(req, res);
};

export default handler;
