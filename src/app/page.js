// app/page.js
"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PictureLayout from '../components/PictureLayout';
import TinTuc from '../components/TinTuc';

export default function Home() {
  const images = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024, // For screens up to 1024px wide
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // For screens up to 768px wide (tablets)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // For screens up to 480px wide (mobile devices)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
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
      <div className="my-8">
        <PictureLayout />
      </div>
      <div className="my-8">
        <TinTuc />
      </div>
    </div>
  );
}