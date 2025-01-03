const express = require('express');
const router = express.Router();
const News = require('../Model/News');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thiết lập multer
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
    }
});

// Lấy tất cả tin tức
router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy tin tức nổi bật
router.get("/featured", async (req, res) => {
    try {
        const featuredNews = await News.find({ featured: true }).sort({ createdAt: -1 });
        res.status(200).json(featuredNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy tin tức theo ID
router.get("/:id", async (req, res) => {
    try {
        const newsItem = await News.findById(new mongoose.Types.ObjectId(req.params.id));
        if (!newsItem) {
            return res.status(404).json({ message: "Không tìm thấy tin tức" });
        }
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tạo tin tức mới
router.post("/", async (req, res) => {
    try {
        const newsData = {
            title: req.body.title,
            image: req.body.image,
            excerpt: req.body.excerpt,
            content: req.body.content,
            date: new Date().setHours(0, 0, 0, 0),
            views: 0,
            featured: req.body.featured || false
        };
        const news = new News(newsData);
        const savedNews = await news.save();
        res.status(201).json(savedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật tin tức
router.put("/:id", async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.body.date && typeof req.body.date === 'string') {
            let newsDate;
            if (req.body.date.includes('/')) {
                const [day, month, year] = req.body.date.split('/');
                newsDate = new Date(year, month - 1, day);
            } else {
                newsDate = new Date(req.body.date);
            }
            newsDate.setHours(0, 0, 0, 0);
            updateData.date = newsDate;
        }

        const newsItem = await News.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id),
            updateData,
            { new: true }
        );

        if (!newsItem) {
            return res.status(404).json({ message: "Không tìm thấy tin tức" });
        }

        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa tin tức
router.delete("/:id", async (req, res) => {
    try {
        const newsItem = await News.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
        if (!newsItem) {
            return res.status(404).json({ message: "Không tìm thấy tin tức" });
        }
        res.status(200).json({ message: "Đã xóa tin tức thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật lượt xem
router.put("/:id/view", async (req, res) => {
    try {
        const newsItem = await News.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id),
            { $inc: { views: 1 } },
            { new: true, runValidators: false }
        );
        if (!newsItem) {
            return res.status(404).json({ message: "Không tìm thấy tin tức" });
        }
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload ảnh
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Không có file nào được tải lên' });
        }
        const fileUrl = `/uploads/${file.filename}`;
        res.status(200).json({ url: fileUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;