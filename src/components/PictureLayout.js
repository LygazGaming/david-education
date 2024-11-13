"use client";
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ImageSection = ({ src, alt, className }) => (
  <div className={`relative overflow-hidden rounded-2xl group ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
  </div>
);

const TextBox = ({ children, className }) => (
  <div className={`bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
    <div className="text-center text-white">
      <FaQuoteLeft className="text-4xl mb-4 opacity-50 mx-auto" />
      <p className="text-lg font-medium leading-relaxed">{children}</p>
    </div>
  </div>
);

const GALLERY_DATA = {
  featured: [
    { src: "/img/img001.jpg", text: "Chúng tôi cam kết mang đến những giờ học chất lượng nhất cho các cầu thủ trẻ" },
    { src: "/img/img100.jpg", text: "Đội tuyển trẻ" }
  ],
  section1: [
    { src: "/img/img003.jpg", alt: "Huấn luyện viên" },
    { text: "Chúng tôi cam kết mang đến những giờ học chất lượng nhất cho các cầu thủ trẻ" },
    { src: "/img/img004.jpg", alt: "Buổi tập luyện" }
  ],
  section2: [
    { text: "Đội ngũ HLV giàu kinh nghiệm, tận tâm với nghề" },
    { src: "/img/img140.jpg", alt: "Khoảnh khắc tập luyện" },
    { text: "Trang thiết bị hiện đại, cơ sở vật chất đạt chuẩn quốc tế" }
  ]
};

export default function PictureLayout() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-4 md:pt-12"> {/* Thay đổi ở đây */}
      {/* Featured Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full p-0 overflow-hidden">
        {GALLERY_DATA.featured.map((item, index) => (
          <div key={index} className="relative flex w-full">
            <ImageSection
              src={item.src}
              alt={item.alt}
              className="h-[400px] w-full hover:-translate-y-1 transition-all duration-300 object-cover"
            />
            <div className="absolute left-0 bottom-0 h-1/2 w-1/3 bg-black bg-opacity-70 text-white p-4 flex items-center">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {GALLERY_DATA.section1.map((item, index) => (
          item.text ? (
            <TextBox key={index}>{item.text}</TextBox>
          ) : (
            <ImageSection
              key={index}
              src={item.src}
              alt={item.alt}
              className="h-[300px] hover:-translate-y-1 transition-all duration-300"
            />
          )
        ))}
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {GALLERY_DATA.section2.map((item, index) => (
          item.text ? (
            <TextBox key={index}>{item.text}</TextBox>
          ) : (
            <ImageSection
              key={index}
              src={item.src}
              alt={item.alt}
              className="h-[300px] hover:-translate-y-1 transition-all duration-300"
            />
          )
        ))}
      </div>
    </div>
  );
}