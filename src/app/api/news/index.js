import dbConnect from "../utils/dbConnect";
import News from "../models/News";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const news = await News.find().sort({ createdAt: -1 });
      return res.status(200).json(news);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const news = new News(req.body);
      const savedNews = await news.save();
      return res.status(201).json(savedNews);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Phương thức không được hỗ trợ!" });
}
