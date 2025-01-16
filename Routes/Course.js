const express = require("express");
const router = express.Router();
const Course = require("../Model/Course");

// Lấy tất cả khóa học
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({ active: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khóa học" });
  }
});

// Tạo khóa học mới
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật khóa học
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa khóa học
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa khóa học thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
