// /src/app/api/videos/route.js
import dbConnect from "../../utils/dbConnect";
import Video from "../../models/Video";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const video = await Video.findById(id).lean();
      if (!video)
        return jsonResponse(
          { success: false, message: "Video không tồn tại" },
          404
        );
      return jsonResponse({ success: true, data: video }, 200);
    } else {
      const videos = await Video.find().lean();
      if (!videos.length) {
        const defaultData = [
          {
            id: 1,
            thumbnail: "/img2/img001.webp",
            videoUrl:
              "https://www.tiktok.com/@coanh_caulong/video/7367984134410603783",
            title: "Kỹ thuật phát cầu cơ bản",
            description:
              "Hướng dẫn chi tiết các kỹ thuật phát cầu cơ bản cho người mới chơi.",
            author: "HLV Minh Quân",
            views: "12.5K",
            createdAt: new Date(),
          },
          {
            id: 2,
            thumbnail: "/img2/img042.webp",
            videoUrl: "https://youtube.com/shorts/hlDcfJxfZ54?feature=shared",
            title: "Bài tập footwork nâng cao",
            description:
              "Các bài tập di chuyển sân chuyên nghiệp cho VĐV cầu lông.",
            author: "HLV Thu Hiền",
            views: "8.2K",
            createdAt: new Date(),
          },
          // Thêm các video khác như VIDEO_DATA
        ];
        return jsonResponse({ success: true, data: defaultData }, 200);
      }
      return jsonResponse({ success: true, data: videos }, 200);
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { thumbnail, videoUrl, title, description, author, views } = body;

    if (
      !thumbnail ||
      !videoUrl ||
      !title ||
      !description ||
      !author ||
      !views
    ) {
      return jsonResponse(
        { success: false, message: "Thiếu các trường bắt buộc" },
        400
      );
    }

    const newVideo = new Video({
      thumbnail,
      videoUrl,
      title,
      description,
      author,
      views,
    });
    await newVideo.save();

    return jsonResponse({ success: true, data: newVideo }, 201);
  } catch (error) {
    console.error("Error creating video:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
