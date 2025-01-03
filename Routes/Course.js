const express = require('express');
const router = express.Router();
const Course = require('../Model/Course');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thiết lập multer
const uploadDir = path.join(process.cwd(), 'public/uploads/courses');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'course-' + uniqueSuffix + path.extname(file.originalname));
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

// Lấy tất cả khóa học
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy khóa học nổi bật
router.get('/featured', async (req, res) => {
    try {
        const courses = await Course.find({ featured: true }).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy khóa học theo ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm khóa học mới
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng upload ảnh' });
        }

        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,
            image: `/uploads/courses/${req.file.filename}`,
            featured: req.body.featured || false
        });

        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật khóa học
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/courses/${req.file.filename}`;
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa khóa học
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học' });
        }

        // Xóa ảnh
        const imagePath = path.join(process.cwd(), 'public', course.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ message: 'Đã xóa khóa học thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;