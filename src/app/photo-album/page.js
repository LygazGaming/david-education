"use client";
import React from 'react';
import Image from 'next/image';

export default function photo_album() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tất cả album ảnh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ALBUM_DATA.map((album) => (
            <div key={album.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <Image 
                  src={album.image} 
                  alt={album.title} 
                  width={800}         
                  height={500}        
                  style={{ objectFit: 'cover' }}  
                  className="transition-transform duration-500 hover:scale-105"
                />
              <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                <p className="text-gray-600 text-sm">{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


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
  },
  {
    id: 7,
    image: "/img2/img001.webp",
    title: "Album 7",
    description: "Mô tả album 7"
  },
  {
    id: 8,
    image: "/img2/img002.webp",
    title: "Album 8",
    description: "Mô tả album 8"
  },
  {
    id: 9,
    image: "/img2/img003.webp",
    title: "Album 9",
    description: "Mô tả album 9"
  }
];
