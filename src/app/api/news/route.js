// /src/app/api/news/route.js
import dbConnect from "../../utils/dbConnect";
import News from "../../models/News";
import Category from "../../models/Category";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), { status });

// GET: Lấy tất cả news hoặc chi tiết theo id
export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const categoryId = searchParams.get("category");

  try {
    if (id) {
      const news = await News.findById(id).populate("category");
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else if (categoryId) {
      const news = await News.find({ category: categoryId })
        .populate("category")
        .sort({ date: -1 });
      return jsonResponse({ success: true, data: news }, 200);
    } else {
      const news = await News.find().populate("category").sort({ date: -1 });
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
    const { title, image, excerpt, content, date, featured, category } = body;

    if (!title || !image || !excerpt || !content || !date) {
      return jsonResponse(
        { success: false, message: "Missing required fields" },
        400
      );
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return jsonResponse(
          { success: false, message: "Danh mục không tồn tại" },
          400
        );
      }
    }

    const newNews = new News({
      title,
      image,
      excerpt,
      content,
      date: new Date(date),
      featured: featured || false,
      category: category || null,
    });

    await newNews.save();
    return jsonResponse({ success: true, data: newNews }, 201);
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// DELETE: Xóa news (giữ nguyên)
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

// PUT: Cập nhật news (cập nhật để category là tùy chọn)
export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id)
      return jsonResponse({ success: false, message: "ID is required" }, 400);

    const body = await req.json();
    if (body.hasOwnProperty("featured") && Object.keys(body).length === 1) {
      const news = await News.findByIdAndUpdate(
        id,
        { featured: body.featured },
        { new: true }
      ).populate("category");
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else if (!body.title) {
      const news = await News.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate("category");
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    } else {
      const { title, image, excerpt, content, date, featured, category } = body;
      if (!title || !image || !excerpt || !content || !date) {
        return jsonResponse(
          { success: false, message: "Missing required fields" },
          400
        );
      }
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return jsonResponse(
            { success: false, message: "Danh mục không tồn tại" },
            400
          );
        }
      }
      const news = await News.findByIdAndUpdate(
        id,
        {
          title,
          image,
          excerpt,
          content,
          date: new Date(date),
          featured,
          category: category || null,
        },
        { new: true }
      ).populate("category");
      if (!news)
        return jsonResponse({ success: false, message: "News not found" }, 404);
      return jsonResponse({ success: true, data: news }, 200);
    }
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
