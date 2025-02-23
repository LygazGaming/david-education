// /src/app/api/picture-layout/route.js
import dbConnect from "../../utils/dbConnect";
import PictureLayout from "../../models/PictureLayout";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();

  try {
    const pictureLayout = await PictureLayout.findOne(); // Lấy bản ghi đầu tiên
    if (!pictureLayout) {
      // Nếu chưa có dữ liệu, trả về dữ liệu mặc định
      const defaultData = {
        mainFeature: {
          image: "/images/home/1.jpg",
          title: "Trung tâm đào tạo cầu lông dành cho em trẻ",
        },
        memberships: [
          {
            title:
              "Mô Hình Mindful Badminton - Huấn Luyện Cầu Lông, Đào Luyện Nhân Cách",
            bgColor: "bg-primary",
            icon: "faGraduationCap",
          },
          { image: "/images/home/2.jpg", bgColor: "bg-primary" },
          { image: "/images/home/3.jpg", bgColor: "bg-primary" },
          {
            title: "Đội ngũ HLV giàu kinh nghiệm, tận tâm với nghề",
            bgColor: "bg-primary",
            icon: "faUsers",
          },
          {
            title:
              "Giáo án bài bản, cá nhân hoá và đặc biệt lòng ghép các bài học ý nghĩa thông qua các bài tập",
            bgColor: "bg-primary",
            icon: "faBook",
          },
          { image: "/images/home/4.jpg", bgColor: "bg-primary" },
          { image: "/images/home/5.jpg", bgColor: "bg-primary" },
          {
            title: "Các lớp học đà dạng từ cơ bản, nâng cao, năng khiếu",
            bgColor: "bg-primary",
            icon: "faLayerGroup",
          },
        ],
      };
      return jsonResponse({ success: true, data: defaultData }, 200);
    }
    return jsonResponse({ success: true, data: pictureLayout }, 200);
  } catch (error) {
    console.error("Error fetching picture layout:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

// POST: Tạo hoặc cập nhật dữ liệu (tuỳ chọn nếu bạn muốn admin thêm/sửa)
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { mainFeature, memberships } = body;

    if (!mainFeature || !memberships) {
      return jsonResponse(
        { success: false, message: "Missing required fields" },
        400
      );
    }

    // Xoá dữ liệu cũ và tạo mới (hoặc dùng findOneAndUpdate nếu muốn cập nhật)
    await PictureLayout.deleteMany({});
    const newLayout = new PictureLayout({ mainFeature, memberships });
    await newLayout.save();

    return jsonResponse({ success: true, data: newLayout }, 201);
  } catch (error) {
    console.error("Error creating picture layout:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
