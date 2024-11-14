"use client";
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ALBUM_DATA = [
  {
    id: 1,
    image: "/img2/img036.webp",
    title: "Giải đấu mùa hè 2023",
    description: "Những khoảnh khắc đáng nhớ từ giải đấu mùa hè"
  },
  {
    id: 2,
    image: "/img2/img056.webp",
    title: "Buổi tập luyện",
    description: "Các cầu thủ trong buổi tập luyện hàng tuần"
  },
  {
    id: 3,
    image: "/img2/img093.webp",
    title: "Đội tuyển trẻ",
    description: "Đội tuyển trẻ tham gia giải U15"
  },
  {
    id: 4,
    image: "/img2/img050.webp",
    title: "Khoảnh khắc chiến thắng",
    description: "Niềm vui chiến thắng của đội nhà"
  },
  {
    id: 5,
    image: "/img2/img030.webp",
    title: "Lễ trao giải",
    description: "Buổi lễ trao giải thưởng cuối mùa"
  },
  {
    id: 6,
    image: "/img2/img024.webp",
    title: "Đào tạo trẻ",
    description: "Chương trình đào tạo bóng đá trẻ"
  }
];

const ImageCard = ({ image }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative group">
      <img 
        src={image.image} 
        alt={image.title} 
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
        <p className="text-gray-200 text-sm">{image.description}</p>
      </div>
    </div>
  </div>
);

export default function AlbumAnh() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Album Ảnh
            </h2>
            <div className="h-1 w-20 bg-orange-500 mt-3"></div>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg 
                           hover:bg-orange-600 transition-colors group">
            <span>Xem tất cả</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ALBUM_DATA.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}