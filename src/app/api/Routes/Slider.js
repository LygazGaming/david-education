const express = require("express");
const router = express.Router();
const Slider = require("../Model/Slider");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Thiết lập multer
const uploadDir = path.join(process.cwd(), "public/uploads/sliders");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "slider-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file ảnh!"), false);
    }
  },
});

// Lấy tất cả slider
router.get("/", async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm slider mới
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng upload ảnh" });
    }

    const slider = new Slider({
      image: `/uploads/sliders/${req.file.filename}`,
      order: req.body.order || 0,
      active: req.body.active || true,
    });

    const savedSlider = await slider.save();
    res.status(201).json(savedSlider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật slider
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/sliders/${req.file.filename}`;
    }

    const slider = await Slider.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!slider) {
      return res.status(404).json({ message: "Không tìm thấy slider" });
    }

    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa slider
router.delete("/:id", async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: "Không tìm thấy slider" });
    }

    // Xóa file ảnh
    const imagePath = path.join(process.cwd(), "public", slider.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: "Đã xóa slider thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
