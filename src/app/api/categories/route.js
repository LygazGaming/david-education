// src/app/api/categories/route.js
import dbConnect from "../../utils/dbConnect";
import Category from "../..//models/Category";

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

// ... existing code ...

export async function PUT(req) {
  await dbConnect();

  const { id, name } = await req.json();

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...

export async function DELETE(req) {
  await dbConnect();

  const { id } = await req.json();

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Category deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...
