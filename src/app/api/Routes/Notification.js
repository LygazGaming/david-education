import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Route để lấy thông báo
router.get("/", async (req, res) => {
  try {
    let notification = await Notification.findOne();
    if (!notification) {
      notification = await Notification.create({
        text: "Chào mừng đến với website",
      });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route để cập nhật thông báo
router.put("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Nội dung thông báo không được để trống",
      });
    }

    let notification = await Notification.findOne();
    if (!notification) {
      notification = new Notification({ text });
    } else {
      notification.text = text;
      notification.updatedAt = Date.now();
    }

    await notification.save();
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
