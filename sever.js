const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    console.log("Đã kết nối tới MongoDB");
    await mongoose.connect(process.env.MONGO_URI);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

connectDB();

// Routes
const newsRoutes = require("./Routes/News");

const categoryRoutes = require("./Routes/Category"); // Thêm route mới
const sliderRoutes = require("./Routes/Slider");
const courseRoutes = require("./Routes/Course");
const albumRoutes = require("./Routes/Album");
const sponsorRoutes = require("./Routes/Sponsor");
const videoRoutes = require("./Routes/Video");
const notificationRoutes = require("./Routes/Notification");

// Đăng ký Routes
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/notification", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Có lỗi xảy ra từ phía server!" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy đường dẫn!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
