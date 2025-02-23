// /src/app/api/photo-albums/route.js
import dbConnect from "../../utils/dbConnect";
import PhotoAlbum from "../../models/PhotoAlbum";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();

  try {
    const albums = await PhotoAlbum.find().lean();
    if (!albums.length) {
      // Trả về dữ liệu mặc định nếu chưa có trong DB
      const defaultData = [
        {
          id: 1,
          image: "/img2/img036.webp",
          title: "GIẢI ĐẤU HÈ 2024",
          description: "Những khoảnh khắc đáng nhớ từ giải đấu mùa hè",
          photos: [
            { src: "/img2/img036.webp", alt: "Ảnh 1 giải đấu hè" },
            { src: "/img2/img037.webp", alt: "Ảnh 2 giải đấu hè" },
            { src: "/img2/img038.webp", alt: "Ảnh 3 giải đấu hè" },
          ],
        },
        {
          id: 2,
          image: "/img2/img056.webp",
          title: "LỚP NĂNG KHIẾU",
          description: "Các cầu thủ trong buổi tập luyện hàng tuần",
          photos: [
            { src: "/img2/img056.webp", alt: "Ảnh 1 lớp năng khiếu" },
            { src: "/img2/img057.webp", alt: "Ảnh 2 lớp năng khiếu" },
          ],
        },
        // Thêm các album khác tương tự
      ];
      return jsonResponse({ success: true, data: defaultData }, 200);
    }
    return jsonResponse({ success: true, data: albums }, 200);
  } catch (error) {
    console.error("Error fetching photo albums:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// POST: Tạo album mới (tuỳ chọn cho admin)
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { title, image, description, photos } = body;

    if (!title || !image || !description || !photos) {
      return jsonResponse(
        { success: false, message: "Missing required fields" },
        400
      );
    }

    const newAlbum = new PhotoAlbum({ title, image, description, photos });
    await newAlbum.save();

    return jsonResponse({ success: true, data: newAlbum }, 201);
  } catch (error) {
    console.error("Error creating photo album:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
