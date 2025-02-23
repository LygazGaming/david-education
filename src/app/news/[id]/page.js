// src/app/news/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import CategoryMenu from "../../../components/CategoryMenu";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import React, { useState, useEffect } from "react";

// Hàm định dạng ngày
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Ngày không xác định";
  }
};

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy chi tiết tin tức
  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/news?id=${id}`); // Gọi API với query id
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu");
        }
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "Lỗi từ API");
        }
        setNews(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Tăng lượt xem
  useEffect(() => {
    const increaseViews = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/news?id=${id}`, {
          method: "PUT",
        });
        if (!response.ok) {
          console.error("Failed to increase views");
          return;
        }
        const result = await response.json();
        if (result.success && result.data) {
          setNews((prev) => ({ ...prev, views: result.data.views })); // Cập nhật views
        }
      } catch (error) {
        console.error("Error increasing views:", error);
      }
    };

    increaseViews();
  }, [id]);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!news)
    return <div className="text-center py-12">404 - Không tìm thấy</div>;

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-12">
      <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-md md:order-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            {formatDate(news.date)}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-orange-500" />
            {news.views} lượt xem
          </span>
        </div>
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-[400px] object-cover mb-4 rounded-lg"
        />
        <div
          className="text-gray-600 mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
        {news.images &&
          news.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="w-full h-auto mt-4 rounded-lg"
            />
          ))}
      </div>
      <div className="w-full md:w-1/4 pr-4 hidden md:block">
        <CategoryMenu />
      </div>
      <div className="w-full md:hidden mt-4">
        <CategoryMenu />
      </div>
    </div>
  );
}
