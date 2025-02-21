import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";

export async function GET(req) {
  await dbConnect();

  try {
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { name } = await req.json();

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
