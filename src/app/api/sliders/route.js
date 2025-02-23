// /src/app/api/slider/route.js
import dbConnect from "../../utils/dbConnect";
import Slider from "../../models/Slider";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();

  try {
    const sliders = await Slider.find().sort({ order: 1 }).lean(); // Sắp xếp theo order
    if (!sliders.length) {
      // Dữ liệu mặc định nếu DB trống
      const defaultData = [
        { src: "/images/slider/slider_01.webp", alt: "Slide 1" },
        { src: "/images/slider/slider_02.webp", alt: "Slide 2" },
        { src: "/images/slider/slider_03.webp", alt: "Slide 3" },
        { src: "/images/slider/slider_04.webp", alt: "Slide 4" },
      ];
      return jsonResponse({ success: true, data: defaultData }, 200);
    }
    return jsonResponse({ success: true, data: sliders }, 200);
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// POST: Tạo slider mới (tuỳ chọn cho admin)
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { src, alt, order } = body;

    if (!src) {
      return jsonResponse(
        { success: false, message: "Missing required field: src" },
        400
      );
    }

    const newSlider = new Slider({ src, alt, order });
    await newSlider.save();

    return jsonResponse({ success: true, data: newSlider }, 201);
  } catch (error) {
    console.error("Error creating slider:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
