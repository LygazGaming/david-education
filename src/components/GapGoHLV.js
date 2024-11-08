"use client";
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const COACHES_DATA = [
  {
    image: "/img/img021.jpg",
    title: "HLV Nguyễn Văn A",
    role: "Huấn luyện viên trưởng",
    experience: "20+ năm kinh nghiệm",
    description: "Với hơn 20 năm kinh nghiệm huấn luyện bóng đá, HLV Nguyễn Văn A là người luôn tận tâm trong việc đào tạo và truyền đạt những kỹ năng tốt nhất đến các học viên.",
    achievements: ["Chứng chỉ HLV UEFA Pro", "Cựu cầu thủ ĐTQG", "Vô địch V-League 2018"]
  },
  {
    image: "/img/img088.jpg",
    title: "HLV Trần B",
    role: "Chuyên gia thể lực",
    experience: "15+ năm kinh nghiệm",
    description: "HLV Trần B chuyên gia về thể lực, với kỹ năng huấn luyện cơ bản, ông đã giúp đỡ hàng trăm cầu thủ trẻ phát triển thể chất và kỹ năng.",
    achievements: ["Chứng chỉ HLV UEFA A", "Chuyên gia thể lực FIFA", "Huấn luyện viên CLB Hà Nội"]
  },
  {
    image: "/img/img038.jpg",
    title: "HLV Lê C",
    role: "Chuyên gia chiến thuật",
    experience: "12+ năm kinh nghiệm",
    description: "HLV Lê C có kinh nghiệm lâu năm về chiến thuật, với khả năng định hình lối chơi và hướng dẫn chiến thuật cho các cầu thủ trẻ.",
    achievements: ["Chứng chỉ HLV UEFA B", "Cựu đội trưởng CLB", "Vô địch U23 2019"]
  },
  {
    image: "/img/img058.jpg",
    title: "HLV Phạm D",
    role: "HLV đào tạo trẻ",
    experience: "10+ năm kinh nghiệm",
    description: "Với phong cách tận tâm, HLV Phạm D tập trung vào việc phát triển kỹ năng cá nhân và tinh thần đồng đội cho các cầu thủ trẻ.",
    achievements: ["Chứng chỉ HLV AFC", "Chuyên gia đào tạo trẻ", "Giải thưởng HLV trẻ xuất sắc"]
  }
];

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-4' : 'right-4'} 
    z-10 bg-white/80 hover:bg-white text-orange-500 p-3 rounded-full shadow-lg
    transition-all duration-300 hover:scale-110`}
  >
    {direction === 'left' ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
  </button>
);

const CoachCard = ({ coach }) => (
  <div className="px-4">
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative group">
        <img 
          src={coach.image} 
          alt={coach.title} 
          className="w-full h-[400px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{coach.title}</h3>
          <p className="text-orange-400 font-semibold mb-1">{coach.role}</p>
          <p className="text-gray-200">{coach.experience}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {coach.description}
        </p>
        <div className="space-y-2">
          {coach.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function GapGoHLV() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true
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
              Gặp Gỡ Đội Ngũ Huấn Luyện Viên
            </h2>
            <div className="h-1 w-20 bg-orange-500 mt-3"></div>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg 
                           hover:bg-orange-600 transition-colors group">
            <span>Xem tất cả</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <Slider {...settings}>
          {COACHES_DATA.map((coach, index) => (
            <CoachCard key={index} coach={coach} />
          ))}
        </Slider>
      </div>
    </div>
  );
}