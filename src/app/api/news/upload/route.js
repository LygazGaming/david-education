// /src/app/api/news/upload/route.js
import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary với biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "[hidden]" : undefined,
});

// Hàm trả về response JSON
const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req) {
  try {
    const { data } = await req.json();
    console.log("Received base64 data length:", data?.length);

    if (!data) {
      return jsonResponse(
        { success: false, message: "No image data provided" },
        400
      );
    }

    // Upload lên Cloudinary
    console.log("Uploading to Cloudinary...");
    const uploadResponse = await cloudinary.uploader.upload(data, {
      folder: "news_images",
      upload_preset: "ml_default",
    });

    console.log("Upload successful, URL:", uploadResponse.secure_url);
    return jsonResponse({ success: true, url: uploadResponse.secure_url }, 200);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return jsonResponse(
      { success: false, message: "Lỗi upload ảnh: " + error.message },
      500
    );
  }
}
