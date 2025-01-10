const express = require('express');
const router = express.Router();
const Sponsor = require('../Model/Sponsor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thiết lập multer
const uploadDir = path.join(process.cwd(), 'public/uploads/sponsors');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'sponsor-' + uniqueSuffix + path.extname(file.originalname));
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

// Lấy tất cả nhà tài trợ
router.get('/', async (req, res) => {
    try {
        const sponsors = await Sponsor.find({ active: true }).sort({ order: 1 });
        res.status(200).json(sponsors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy nhà tài trợ theo ID
router.get('/:id', async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Không tìm thấy nhà tài trợ' });
        }
        res.status(200).json(sponsor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm nhà tài trợ mới
router.post('/', upload.single('logo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng upload logo' });
        }

        const sponsor = new Sponsor({
            name: req.body.name,
            website: req.body.website,
            logo: `/uploads/sponsors/${req.file.filename}`,
            order: req.body.order || 0,
            active: req.body.active !== undefined ? req.body.active : true
        });

        const savedSponsor = await sponsor.save();
        res.status(201).json(savedSponsor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật nhà tài trợ
router.put('/:id', upload.single('logo'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.logo = `/uploads/sponsors/${req.file.filename}`;
        }

        const sponsor = await Sponsor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!sponsor) {
            return res.status(404).json({ message: 'Không tìm thấy nhà tài trợ' });
        }

        res.status(200).json(sponsor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa nhà tài trợ
router.delete('/:id', async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Không tìm thấy nhà tài trợ' });
        }

        // Xóa logo
        const logoPath = path.join(process.cwd(), 'public', sponsor.logo);
        if (fs.existsSync(logoPath)) {
            fs.unlinkSync(logoPath);
        }

        res.status(200).json({ message: 'Đã xóa nhà tài trợ thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;