// /src/app/api/categories/route.js
import dbConnect from "../../utils/dbConnect";
import Category from "../../models/Category";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const category = await Category.findOne({ slug }).lean();
      if (!category) {
        return jsonResponse(
          { success: false, message: "Danh mục không tồn tại" },
          404
        );
      }
      return jsonResponse({ success: true, data: category }, 200);
    } else {
      const categories = await Category.find().lean();
      if (!categories.length) {
        const defaultData = [
          { name: "Tin tức", slug: "tin-tuc" },
          { name: "Sự kiện", slug: "su-kien" },
          { name: "Kiến thức", slug: "kien-thuc" },
        ];
        await Category.insertMany(defaultData);
        return jsonResponse({ success: true, data: defaultData }, 200);
      }
      return jsonResponse({ success: true, data: categories }, 200);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return jsonResponse(
        { success: false, message: "Thiếu tên hoặc slug danh mục" },
        400
      );
    }

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    return jsonResponse({ success: true, data: newCategory }, 201);
  } catch (error) {
    console.error("Error creating category:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
