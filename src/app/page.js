// app/page.js
"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PictureLayout from '../components/PictureLayout';
import TinTuc from '../components/TinTuc';
import GapGoHLV from '@/components/GapGoHLV';
import HocPhan from '@/components/HocPhan';

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
        breakpoint: 1024, // Đối với màn hình lớn hơn 768px nhưng dưới 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Đối với màn hình dưới 768px (tablet)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // Đối với màn hình dưới 480px (di động)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div>
      <div className="slider-container relative">
        <Slider {...settings} className="h-full">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img 
                src={img} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-[70vh] md:h-[80vh] lg:h-[calc(100vh-100px)] object-cover object-center" 
              />
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
      <div className="my-8">
        <GapGoHLV />
      </div>
      <div className='my-8'>
        <HocPhan/>
      </div>
    </div>
  );
}
