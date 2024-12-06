const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

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
    _id: Number,
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
        default: 0,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const News = mongoose.model("News", NewsSchema);

const app = express();
app.use(bodyParser.json());

// Kết nối MongoDB
connectDB();

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
        const newsItem = await News.findById(Number(req.params.id));
        if (!newsItem) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(newsItem);
    } catch (error) {
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
        const lastNews = await News.findOne().sort({ _id: -1 });
        const newId = lastNews ? lastNews._id + 1 : 1;

        // Xử lý ngày tháng
        let newsDate;
        if (req.body.date.includes('/')) {
            const [day, month, year] = req.body.date.split('/');
            newsDate = new Date(year, month - 1, day); // month - 1 vì tháng trong JS bắt đầu từ 0
        } else {
            newsDate = new Date(req.body.date);
        }

        const newsData = {
            _id: newId,
            title: req.body.title,
            image: req.body.image,
            excerpt: req.body.excerpt,
            content: req.body.content,
            date: newsDate,
            views: 0,
            featured: req.body.featured || false
        };

        const news = new News(newsData);
        const savedNews = await news.save();
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

        const newsItem = await News.findByIdAndUpdate(
            Number(req.params.id),
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
        const newsItem = await News.findByIdAndDelete(Number(req.params.id));
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
        const newsItem = await News.findByIdAndUpdate(
            Number(req.params.id),
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});