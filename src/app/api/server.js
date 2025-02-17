import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Hello World",
    env: process.env.NODE_ENV,
  });
});

const handler = (req, res) => {
  return app(req, res);
};

export default handler;
