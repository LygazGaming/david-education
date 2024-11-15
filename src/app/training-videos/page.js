"use client";
import React from 'react';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';
import Link from 'next/link';

export default function training_videos() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Tất cả Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_DATA.map(video => (
          <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <Link href={`/videos/${video.id}`}>
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-5">
              <h4 className="font-bold text-gray-800 hover:text-orange-500 transition-colors">
                {video.title}
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                {video.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-500" />
                  {/* Thay thế bằng thông tin ngày nếu có */}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye className="text-orange-500" />
                  {video.views} lượt xem
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const VIDEO_DATA = [
  {
    id: 1,
    thumbnail: "/img2/img001.webp",
    videoUrl: "https://www.tiktok.com/@coanh_caulong/video/7367984134410603783?is_from_webapp=1&sender_device=pc&web_id=7394100649481111047",
    title: "Kỹ thuật phát cầu cơ bản",
    description: "Hướng dẫn chi tiết các kỹ thuật phát cầu cơ bản cho người mới chơi. Phân tích các yếu tố quan trọng để có cú phát cầu chuẩn xác và hiệu quả.",
    author: "HLV Minh Quân",
    views: "12.5K"
  },
  {
    id: 2,
    thumbnail: "/img2/img042.webp",
    videoUrl: "https://youtube.com/shorts/hlDcfJxfZ54?feature=shared",
    title: "Bài tập footwork nâng cao",
    description: "Các bài tập di chuyển sân chuyên nghiệp cho VĐV cầu lông. Hướng dẫn kỹ thuật di chuyển đúng cách và các bài tập nâng cao tốc độ di chuyển.",
    author: "HLV Thu Hiền",
    views: "8.2K"
  },
  {
    id: 3,
    thumbnail: "/img2/img082.webp",
    videoUrl: "https://www.tiktok.com/@badminton.tips/video/1234567892",
    title: "Chiến thuật đánh đôi",
    description: "Phân tích chiến thuật và kỹ năng phối hợp trong đánh đôi. Hướng dẫn cách phối hợp ăn ý với đồng đội và các tình huống xử lý trong thi đấu.",
    author: "HLV Đức Thắng",
    views: "15.3K"
  },
  {
    id: 4,
    thumbnail: "/img2/img051.webp",
    videoUrl: "https://www.tiktok.com/@badminton.tips/video/1234567893",
    title: "Kỹ thuật smash hiệu quả",
    description: "Hướng dẫn chi tiết kỹ thuật đập cầu mạnh và chuẩn xác. Phân tích các yếu tố ảnh hưởng đến lực đánh và độ chính xác của cú đập trong thi đấu.",
    author: "HLV Minh Quân",
    views: "20.1K"
  },
  {
    id: 5,
    thumbnail: "/img2/img031.webp",
    videoUrl: "https://www.tiktok.com/@badminton.tips/video/1234567894",
    title: "Bài tập thể lực chuyên sâu",
    description: "Tập luyện thể lực đúng cách dành cho người chơi cầu lông. Hướng dẫn các bài tập phát triển sức mạnh, sức bền và độ dẻo dai cho vận động viên.",
    author: "HLV Thu Hiền",
    views: "9.8K"
  },
  {
    id: 6,
    thumbnail: "/img2/img005.webp",
    videoUrl: "https://www.tiktok.com/@badminton.tips/video/1234567895",
    title: "Phân tích trận đấu",
    description: "Phân tích kỹ thuật và chiến thuật từ các trận đấu chuyên nghiệp. Học hỏi kinh nghiệm và cách xử lý tình huống từ các tuyển thủ hàng đầu.",
    author: "HLV Đức Thắng",
    views: "18.7K"
  }
];