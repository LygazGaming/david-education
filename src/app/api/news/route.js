// /src/app/api/news/route.js
import dbConnect from "../../utils/dbConnect";
import News from "../../models/News";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), { status });

// GET: Lấy tất cả news hoặc chi tiết theo id
export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const news = await News.findById(id);
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else {
      const news = await News.find().sort({ date: -1 });
      return jsonResponse({ success: true, data: news }, 200);
    }
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// POST: Tạo news mới
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { title, image, excerpt, content, date, featured } = body;
    if (!title || !image || !excerpt || !content || !date) {
      return jsonResponse(
        { success: false, message: "Missing required fields" },
        400
      );
    }
    const newNews = new News({
      title,
      image,
      excerpt,
      content,
      date: new Date(date),
      featured,
    });
    await newNews.save();
    return jsonResponse({ success: true, data: newNews }, 201);
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// DELETE: Xóa news
export async function DELETE(req) {
  await dbConnect();
  try {
    const { id } = await req.json();
    if (!id)
      return jsonResponse({ success: false, message: "ID is required" }, 400);
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews)
      return jsonResponse({ success: false, message: "News not found" }, 404);
    return jsonResponse(
      { success: true, message: "News deleted successfully" },
      200
    );
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// PUT: Cập nhật news
export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id)
      return jsonResponse({ success: false, message: "ID is required" }, 400);

    const body = await req.json();
    if (body.hasOwnProperty("featured") && Object.keys(body).length === 1) {
      // Chỉ cập nhật featured (từ NewsManagement)
      const news = await News.findByIdAndUpdate(
        id,
        { featured: body.featured },
        { new: true }
      );
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else if (!body.title) {
      // Tăng views (logic cũ)
      const news = await News.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else {
      // Cập nhật toàn bộ tin tức (từ EditNews)
      const { title, image, excerpt, content, date, featured } = body;
      if (!title || !image || !excerpt || !content || !date) {
        return jsonResponse(
          { success: false, message: "Missing required fields" },
          400
        );
      }
      const news = await News.findByIdAndUpdate(
        id,
        { title, image, excerpt, content, date: new Date(date), featured },
        { new: true }
      );
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    }
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
