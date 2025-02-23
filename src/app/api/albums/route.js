// /src/app/api/albums/route.js
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
    const albums = await PhotoAlbum.find().limit(6).lean(); // Lấy tối đa 6 album cho trang chủ
    if (!albums.length) {
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
        {
          id: 3,
          image: "/img2/img093.webp",
          title: "LỚP TIÊU CHUẨN NGƯỜI LỚN",
          description: "Đội tuyển trẻ tham gia giải U15",
          photos: [
            { src: "/img2/img093.webp", alt: "Ảnh 1 lớp người lớn" },
            { src: "/img2/img094.webp", alt: "Ảnh 2 lớp người lớn" },
          ],
        },
        {
          id: 4,
          image: "/img2/img050.webp",
          title: "LỚP KÈM 1-1",
          description: "Niềm vui chiến thắng của đội nhà",
          photos: [
            { src: "/img2/img050.webp", alt: "Ảnh 1 lớp kèm" },
            { src: "/img2/img051.webp", alt: "Ảnh 2 lớp kèm" },
          ],
        },
        {
          id: 5,
          image: "/img2/img030.webp",
          title: "RA MẮT DAVID SKILL",
          description: "Buổi lễ trao giải thưởng cuối mùa",
          photos: [
            { src: "/img2/img030.webp", alt: "Ảnh 1 ra mắt" },
            { src: "/img2/img031.webp", alt: "Ảnh 2 ra mắt" },
          ],
        },
        {
          id: 6,
          image: "/img2/img024.webp",
          title: "LỚP TIÊU CHUẨN THIẾU NHI",
          description: "Chương trình đào tạo bóng đá trẻ",
          photos: [
            { src: "/img2/img024.webp", alt: "Ảnh 1 lớp thiếu nhi" },
            { src: "/img2/img025.webp", alt: "Ảnh 2 lớp thiếu nhi" },
          ],
        },
      ];
      return jsonResponse({ success: true, data: defaultData }, 200);
    }
    return jsonResponse({ success: true, data: albums }, 200);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
