// components/GapGoHLV.js
"use client";
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from 'react-icons/fa';

export default function GapGoHLV() {
  const [currentSlide, setCurrentSlide] = useState(0);  // Track current slide index

  const coaches = [
    {
      image: "/img/img021.jpg",
      title: "HLV Nguyễn Văn A",
      description: "Với hơn 20 năm kinh nghiệm huấn luyện bóng đá, HLV Nguyễn Văn A là người luôn tận tâm trong việc đào tạo và truyền đạt những kỹ năng tốt nhất đến các học viên."
    },
    {
      image: "/img/img088.jpg",
      title: "HLV Trần B",
      description: "HLV Trần B chuyên gia về thể lực, với kỹ năng huấn luyện cơ bản, ông đã giúp đỡ hàng trăm cầu thủ trẻ phát triển thể chất và kỹ năng."
    },
    {
      image: "/img/img038.jpg",
      title: "HLV Lê C",
      description: "HLV Lê C có kinh nghiệm lâu năm về chiến thuật, với khả năng định hình lối chơi và hướng dẫn chiến thuật cho các cầu thủ trẻ."
    },
    {
      image: "/img/img058.jpg",
      title: "HLV Phạm D",
      description: "Với phong cách tận tâm, HLV Phạm D tập trung vào việc phát triển kỹ năng cá nhân và tinh thần đồng đội cho các cầu thủ trẻ."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    beforeChange: (current, next) => {
      setCurrentSlide(next);  // Update the current slide index
    },
    customPaging: (i) => (
      <div
        className={`w-4 h-4 rounded-full mx-1 cursor-pointer ${
          currentSlide === i ? 'bg-secondary' : 'bg-white'
        }`}
      />
    ),
    appendDots: dots => (
      <div style={{ bottom: "-35px" }}>
        <ul className="flex justify-center">{dots}</ul>
      </div>
    )
  };

  return (
    <div className="container px-4 py-8 bg-primary rounded-lg shadow-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-white">Gặp Gỡ Huấn Luyện Viên</h2>
        <button className="flex items-center bg-white text-secondary px-4 py-2 rounded-lg shadow hover:bg-secondary-dark transition">
          <span className="mr-2">Xem tất cả</span>
          <FaArrowRight />
        </button>
      </div>
      <hr className="border-t-2 border-white mb-4" />

      <Slider {...settings}>
        {coaches.map((coach, index) => (
          <div key={index} className="flex mb-8">
            <div className="flex w-full">
              <img src={coach.image} alt={coach.title} className="w-1/2 h-auto object-cover rounded-lg" />
              <div className="ml-6 w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{coach.title}</h3>
                  <p className="mt-2 text-white">{coach.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
