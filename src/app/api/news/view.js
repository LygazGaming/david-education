import dbConnect from "../utils/dbConnect";
import News from "../models/News";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "ID không hợp lệ" });

  if (req.method === "PUT") {
    try {
      const newsItem = await News.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!newsItem)
        return res.status(404).json({ message: "Không tìm thấy tin tức" });
      return res.status(200).json(newsItem);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Phương thức không được hỗ trợ!" });
}
