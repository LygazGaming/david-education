// src/app/api/sliders/route.js
import dbConnect from "../../utils/dbConnect";
import Slider from "../..//models/Slider";

export async function GET(req) {
  await dbConnect();

  try {
    const sliders = await Slider.find();
    return new Response(JSON.stringify(sliders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { imageUrl, link } = await req.json();

  try {
    const newSlider = new Slider({ imageUrl, link });
    await newSlider.save();
    return new Response(JSON.stringify(newSlider), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...

export async function PUT(req) {
  await dbConnect();

  const { id, imageUrl, link } = await req.json();

  try {
    const updatedSlider = await Slider.findByIdAndUpdate(
      id,
      { imageUrl, link },
      { new: true }
    );
    if (!updatedSlider) {
      return new Response(JSON.stringify({ message: "Slider not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedSlider), { status: 200 });
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
    const deletedSlider = await Slider.findByIdAndDelete(id);
    if (!deletedSlider) {
      return new Response(JSON.stringify({ message: "Slider not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Slider deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...
