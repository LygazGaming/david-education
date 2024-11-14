"use client";
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft, FaPlay, FaTimes } from 'react-icons/fa';

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

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? '-left-12' : '-right-12'} 
    z-10 bg-white/80 hover:bg-white text-orange-500 p-3 rounded-full shadow-lg
    transition-all duration-300 hover:scale-110 hidden lg:block`}
  >
    {direction === 'left' ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
  </button>
);

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getVideoId = (url) => {
    const regex = /video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-3xl">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors"
        >
          <FaTimes size={24} />
        </button>
        <div className="aspect-video">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${getVideoId(video.videoUrl)}`}
            className="w-full h-full rounded-t-xl"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{video.title}</h3>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium">{video.author}</span>
            <span>•</span>
            <span>{video.views} lượt xem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const getVideoId = (url) => {
      const regex = /video\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
  
    return (
      <div className="px-2">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative">
            {!isPlaying ? (
              // Thumbnail và nút play
              <div 
                className="relative group cursor-pointer" 
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center 
                                  group-hover:scale-110 transition-transform">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-full">
                    <span className="text-white text-xs">{video.views} views</span>
                  </div>
                </div>
              </div>
            ) : (
              // Video player
              <div className="aspect-video">
                <div className="relative">
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${getVideoId(video.videoUrl)}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <FaTimes className="text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-5 h-[180px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
              {video.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
              {video.description}
            </p>
            <div className="flex items-center text-sm text-gray-500 mt-auto pt-3">
              <span className="font-medium">{video.author}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default function VideoHLV() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Video Hướng Dẫn
            </h2>
            <div className="h-1 w-20 bg-orange-500 mt-3"></div>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg 
                           hover:bg-orange-600 transition-colors group">
            <span>Xem tất cả</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative px-4">
          <Slider {...settings}>
            {VIDEO_DATA.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}