import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Video from "../Model/Video.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Thiết lập multer cho thumbnail
const uploadDir = path.join(process.cwd(), "public/uploads/videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "video-thumb-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file ảnh cho thumbnail!"), false);
    }
  },
});

// Lấy tất cả video
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * parseInt(limit);

    const [videos, total] = await Promise.all([
      Video.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Video.countDocuments(),
    ]);

    res.status(200).json({
      videos,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy video nổi bật
router.get("/featured", async (req, res) => {
  try {
    const videos = await Video.find({ featured: true }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy video theo ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Không tìm thấy video" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm video mới
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const videoData = {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      featured: req.body.featured || false,
    };

    if (req.file) {
      videoData.thumbnail = `/uploads/videos/${req.file.filename}`;
    }

    const video = new Video(videoData);
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật video
router.put("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.thumbnail = `/uploads/videos/${req.file.filename}`;
    }

    const video = await Video.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!video) {
      return res.status(404).json({ message: "Không tìm thấy video" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa video
router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Không tìm thấy video" });
    }

    // Xóa thumbnail nếu có
    if (video.thumbnail) {
      const thumbnailPath = path.join(process.cwd(), "public", video.thumbnail);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    res.status(200).json({ message: "Đã xóa video thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
