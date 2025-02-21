import dbConnect from "../utils/dbConnect";
import News from "../models/News";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "ID không hợp lệ" });

  if (req.method === "GET") {
    try {
      const newsItem = await News.findById(id);
      if (!newsItem)
        return res.status(404).json({ message: "Không tìm thấy tin tức" });
      return res.status(200).json(newsItem);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedNews = await News.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedNews)
        return res.status(404).json({ message: "Không tìm thấy tin tức" });
      return res.status(200).json(updatedNews);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedNews = await News.findByIdAndDelete(id);
      if (!deletedNews)
        return res.status(404).json({ message: "Không tìm thấy tin tức" });
      return res.status(200).json({ message: "Đã xóa tin tức thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Phương thức không được hỗ trợ!" });
}
