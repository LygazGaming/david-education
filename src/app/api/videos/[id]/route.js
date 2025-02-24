// /src/app/videos/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const VideoDetail = ({ video }) => {
  const getVideoId = (url) => {
    const regex = /video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const hashtags = [
    "#caulong",
    "#huongdan",
    "#kythuat",
    "#badminton",
    "#tiktokvn",
  ]; // Hashtag mẫu

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row gap-6 mx-auto">
        {/* Video lớn ở trung tâm */}
        <div className="w-full md:w-3/4">
          <div className="relative aspect-[9/16] max-h-[80vh] mx-auto">
            <iframe
              src={`https://www.tiktok.com/embed/v2/${getVideoId(
                video.videoUrl
              )}`}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </div>
        {/* Thông tin chi tiết và hashtag */}
        <div className="w-full md:w-1/4 text-gray-800 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
            <p className="text-gray-600 mb-4">{video.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium">{video.author}</span>
              <span>•</span>
              <span>{video.views} lượt xem</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Hashtags:</p>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-gray-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/training-videos"
        className="mt-6 inline-block text-orange-500 hover:text-orange-600 font-semibold"
      >
        <FaTimes className="inline mr-2" /> Quay lại danh sách video
      </Link>
    </div>
  );
};

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) throw new Error("Không thể lấy video");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setVideo(result.data);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Có lỗi xảy ra khi tải video: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideo();
  }, [id]);

  if (loading)
    return <div className="text-center py-12 text-gray-600">Đang tải...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!video)
    return (
      <div className="text-center py-12 text-gray-600">Video không tồn tại</div>
    );

  return <VideoDetail video={video} />;
}
