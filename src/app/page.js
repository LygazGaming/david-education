"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PictureLayout from '../components/PictureLayout';
import TinTuc from '../components/TinTuc';
import HocPhan from '@/components/HocPhan';
import AlbumAnh from '@/components/AlbumAnh';
import NhaTaiTro from '@/components/NhaTaiTro';
import VideoHLV from '@/components/VideoHLV';

const SLIDER_IMAGES = [
  "/images/slider/slider_01.webp",
  "/images/slider/slider_02.webp",
  "/images/slider/slider_03.webp",
  "/images/slider/slider_04.webp"
];

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false
      }
    }
  ]
};

const Section = ({ children, className = "" }) => (
  <section className={`py-12 ${className}`}>
    {children}
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="hero-section relative">
      <Slider {...SLIDER_SETTINGS} className="slider-wrapper">
          {SLIDER_IMAGES.map((img, index) => (
            <div key={index} className="relative">
              <img 
                src={img} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-auto object-contain object-center"
                loading="lazy"
                />
              <div className="absolute inset-0" />
            </div>
          ))}
        </Slider>
        <PictureLayout /> 
      </section>
      <Section className="bg-gray-50">
        <TinTuc />
      </Section>
      <Section className="bg-gray-50">
        <HocPhan />
      </Section>
      <Section>
        <AlbumAnh />
      </Section>

      <Section className="bg-gray-50">
        <VideoHLV />
      </Section>
        <NhaTaiTro />
    </main>
  );
}