// app/page.js
"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewLayout from '../components/NewLayout';
import Demo from '../components/Demo';

export default function Home() {
  const images = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg", "/images/img4.jpg"];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div>
      <div className="slider-container h-[calc(100vh-100px)] relative">
        <Slider {...settings} className="h-full">
          {images.map((img, index) => (
            <div key={index} className="h-full relative">
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="my-8"> {/* Thêm khoảng cách giữa NewLayout và Demo */}
        <NewLayout />
      </div>
      <div className="my-8"> {/* Thêm khoảng cách giữa NewLayout và Demo */}
        <Demo />
      </div>
    </div>
  );
}