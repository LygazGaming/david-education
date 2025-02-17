import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Album from "../Model/Album.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Thiết lập multer
const uploadDir = path.join(process.cwd(), "public/uploads/albums");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "album-" + uniqueSuffix + path.extname(file.originalname));
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

// Lấy tất cả album
router.get("/", async (req, res) => {
  try {
    const { limit = 6, page = 1 } = req.query;
    const skip = (page - 1) * parseInt(limit);

    const [albums, total] = await Promise.all([
      Album.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Album.countDocuments(),
    ]);

    res.status(200).json({
      albums,
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

// Lấy album theo ID
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Không tìm thấy album" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo album mới
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng upload ảnh bìa" });
    }

    const album = new Album({
      title: req.body.title,
      description: req.body.description,
      coverImage: `/uploads/albums/${req.file.filename}`,
      featured: req.body.featured || false,
      order: req.body.order || 0,
    });

    const savedAlbum = await album.save();
    res.status(201).json(savedAlbum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm ảnh vào album
router.post("/:id/photos", upload.array("photos", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng upload ít nhất một ảnh" });
    }

    const photos = req.files.map((file) => ({
      url: `/uploads/albums/${file.filename}`,
      title: req.body.title,
      description: req.body.description,
    }));

    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { $push: { photos: { $each: photos } } },
      { new: true }
    );

    if (!album) {
      return res.status(404).json({ message: "Không tìm thấy album" });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật album
router.put("/:id", upload.single("coverImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.coverImage = `/uploads/albums/${req.file.filename}`;
    }

    const album = await Album.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!album) {
      return res.status(404).json({ message: "Không tìm thấy album" });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa album
router.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Không tìm thấy album" });
    }

    // Xóa tất cả ảnh trong album
    const imagesToDelete = [
      album.coverImage,
      ...album.photos.map((photo) => photo.url),
    ];
    imagesToDelete.forEach((imageUrl) => {
      const imagePath = path.join(process.cwd(), "public", imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    res.status(200).json({ message: "Đã xóa album thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
