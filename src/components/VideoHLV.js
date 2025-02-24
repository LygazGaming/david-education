"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft, FaPlay, FaTimes } from "react-icons/fa";
import Link from "next/link";

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === "left" ? "-left-12" : "-right-12"
    } 
    z-10 bg-white/80 hover:bg-white text-orange-500 p-3 rounded-full shadow-lg
    transition-all duration-300 hover:scale-110 hidden lg:block`}
  >
    {direction === "left" ? (
      <FaArrowLeft size={20} />
    ) : (
      <FaArrowRight size={20} />
    )}
  </button>
);

const VideoDetailModal = ({ video, isOpen, onClose }) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:-top-12 md:-right-12 text-white hover:text-orange-500 transition-colors z-10"
        >
          <FaTimes size={24} />
        </button>
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
        <div className="w-full md:w-1/4 text-white flex flex-col justify-between p-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
            <p className="text-gray-300 mb-4">{video.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
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
                  className="bg-gray-700/50 text-white text-xs px-2 py-1 rounded-full hover:bg-gray-600 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="px-2">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative group cursor-pointer" onClick={onClick}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-full">
              <span className="text-white text-xs">{video.views} views</span>
            </div>
          </div>
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
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setVideos(result.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Có lỗi xảy ra khi tải video: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

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
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;

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
          <Link href="/training-videos">
            <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors group">
              <span>Xem tất cả</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="relative px-4">
          <Slider {...settings}>
            {videos.map((video) => (
              <VideoCard
                key={video.id || video._id}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </Slider>
        </div>
      </div>
      <VideoDetailModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={closeModal}
      />
    </div>
  );
}
