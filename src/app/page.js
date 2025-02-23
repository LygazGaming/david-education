"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PictureLayout from "../components/PictureLayout";
import TinTuc from "../components/TinTuc";
import HocPhan from "@/components/HocPhan";
import AlbumAnh from "@/components/AlbumAnh";
import NhaTaiTro from "@/components/NhaTaiTro";
import VideoHLV from "@/components/VideoHLV";

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      },
    },
  ],
};

const Section = ({ children, className = "" }) => (
  <section className={`py-12 ${className}`}>{children}</section>
);

export default function Home() {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch("/api/sliders");
        if (!response.ok) throw new Error("Failed to fetch slider images");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setSliderImages(result.data);
      } catch (error) {
        console.error("Error fetching slider images:", error);
        setError("Có lỗi xảy ra khi tải slider: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <main className="min-h-screen">
      <section className="hero-section relative">
        <Slider {...SLIDER_SETTINGS} className="slider-wrapper">
          {sliderImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.src}
                alt={img.alt || `Slide ${index + 1}`}
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
