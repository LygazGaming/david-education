const express = require('express');
const router = express.Router();
const Coach = require('../Model/Coach');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thiết lập multer
const uploadDir = path.join(process.cwd(), 'public/uploads/coaches');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'coach-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
    }
});

// Lấy tất cả HLV
router.get('/', async (req, res) => {
    try {
        const coaches = await Coach.find().sort({ createdAt: -1 });
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy HLV nổi bật
router.get('/featured', async (req, res) => {
    try {
        const coaches = await Coach.find({ featured: true }).sort({ createdAt: -1 });
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy HLV theo ID
router.get('/:id', async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);
        if (!coach) {
            return res.status(404).json({ message: 'Không tìm thấy huấn luyện viên' });
        }
        res.status(200).json(coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm HLV mới
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng upload ảnh' });
        }

        const coach = new Coach({
            name: req.body.name,
            position: req.body.position,
            description: req.body.description,
            image: `/uploads/coaches/${req.file.filename}`,
            featured: req.body.featured || false
        });

        const savedCoach = await coach.save();
        res.status(201).json(savedCoach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật HLV
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/coaches/${req.file.filename}`;
        }

        const coach = await Coach.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!coach) {
            return res.status(404).json({ message: 'Không tìm thấy huấn luyện viên' });
        }

        res.status(200).json(coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa HLV
router.delete('/:id', async (req, res) => {
    try {
        const coach = await Coach.findByIdAndDelete(req.params.id);
        if (!coach) {
            return res.status(404).json({ message: 'Không tìm thấy huấn luyện viên' });
        }

        // Xóa ảnh
        const imagePath = path.join(process.cwd(), 'public', coach.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ message: 'Đã xóa huấn luyện viên thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;