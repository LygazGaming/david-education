const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Kết nối MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return true;    
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.log(error);
    }
};

// Schema cho tin tức
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
        maxLength: 300 // Giới hạn độ dài tóm tắt
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const News = mongoose.model("News", NewsSchema);

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files từ thư mục public
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads'))); // Đường dẫn cụ thể cho uploads

// Kết nối MongoDB
connectDB();

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình storage cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir) // Sử dụng đường dẫn tuyệt đối
    },
    filename: function (req, file, cb) {
        // Thêm kiểm tra và xử lý tên file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    },
    fileFilter: function (req, file, cb) {
        // Kiểm tra loại file
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
    }
});

// API Routes

// 1. Lấy tất cả tin tức
app.get("/api/news", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Lấy tin tức theo ID
app.get("/api/news/:id", async (req, res) => {
    try {
        const newsItem = await News.findById(new mongoose.Types.ObjectId(req.params.id)); // Sử dụng new ObjectId
        if (!newsItem) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(newsItem);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: error.message });
    }
});

// 3. Lấy tin tức nổi bật
app.get("/api/news/featured", async (req, res) => {
    try {
        const featuredNews = await News.find({ featured: true })
            .sort({ createdAt: -1 });
        res.status(200).json(featuredNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Thêm tin tức mới
app.post("/api/news", async (req, res) => {
    try {
        // Xử lý ngày tháng
        let newsDate;
        if (req.body.date.includes('/')) {
            const [day, month, year] = req.body.date.split('/');
            newsDate = new Date(year, month - 1, day); // month - 1 vì tháng trong JS bắt đầu từ 0
        } else {
            newsDate = new Date(req.body.date);
        }

        // Tạo đối tượng tin tức mới
        const newsData = {
            title: req.body.title,
            image: req.body.image,
            excerpt: req.body.excerpt,
            content: req.body.content,
            date: newsDate,
            views: 0,
            featured: req.body.featured || false
        };

        // Tạo một instance mới của model News
        const news = new News(newsData);
        const savedNews = await news.save(); // Lưu tin tức vào cơ sở dữ liệu

        // Trả về phản hồi thành công
        res.status(201).json(savedNews);
    } catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ message: error.message });
    }
});

// 5. Cập nhật tin tức
app.put("/api/news/:id", async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Xử lý ngày tháng nếu có
        if (req.body.date) {
            let newsDate;
            if (req.body.date.includes('/')) {
                const [day, month, year] = req.body.date.split('/');
                newsDate = new Date(year, month - 1, day);
            } else {
                newsDate = new Date(req.body.date);
            }
            updateData.date = newsDate;
        }

        const newsItem = await News.findByIdAndUpdate(new
            mongoose.Types.ObjectId(req.params.id), // Sử dụng ObjectId
            updateData,
            { new: true }
        );

        if (!newsItem) {
            return res.status(404).json({ message: "News not found" });
        }

        res.status(200).json(newsItem);
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ message: error.message });
    }
});

// 6. Xóa tin tức
app.delete("/api/news/:id", async (req, res) => {
    try {
        const newsItem = await News.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id)); // Sử dụng ObjectId
        if (!newsItem) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 7. Tăng lượt xem
app.put("/api/news/:id/view", async (req, res) => {
    try {
        const newsItem = await News.findByIdAndUpdate( new 
            mongoose.Types.ObjectId(req.params.id), // Sử dụng ObjectId
            { $inc: { views: 1 } },  // Chỉ tăng trường views
            { 
                new: true,           // Trả về document đã được cập nhật
                runValidators: false // Không chạy validation
            }
        );

        if (!newsItem) {
            return res.status(404).json({ message: "News not found" });
        }

        res.status(200).json(newsItem);
    } catch (error) {
        console.error("Error updating views:", error);
        res.status(500).json({ message: error.message });
    }
});

// 8. Tìm kiếm tin tức
app.get("/api/news/search", async (req, res) => {
    try {
        const { keyword } = req.query;
        const news = await News.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API upload ảnh
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Trả về URL tương đối thay vì URL đầy đủ
        const fileUrl = `/uploads/${file.filename}`;
        res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});