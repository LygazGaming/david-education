import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// Lấy tất cả danh mục
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ active: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh mục" });
  }
});

// Tạo danh mục mới
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo danh mục" });
  }
});

// Cập nhật danh mục
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật danh mục" });
  }
});

// Xóa danh mục
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa danh mục thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa danh mục" });
  }
});

export default router;
