// src/app/news/page.js
"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";

// Hàm định dạng ngày (tái sử dụng từ component trước)
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Định dạng dd/mm/yyyy theo kiểu Việt Nam
  } catch {
    return "Ngày không xác định";
  }
};

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu từ server");
        }
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "Lỗi từ API");
        }
        setNewsData(result.data || []); // Lấy mảng data từ response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Tất cả tin tức</h2>
      {!Array.isArray(newsData) || newsData.length === 0 ? (
        <div className="text-gray-500 text-lg text-center">
          Không có tin tức nào để hiển thị.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <div
              key={news._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link href={`/news/${news._id}`}>
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-orange-500" />
                    {formatDate(news.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-orange-500" />
                    {news.views}
                  </span>
                </div>
                <Link href={`/news/${news._id}`}>
                  <h4 className="font-bold text-gray-800 hover:text-orange-500 transition-colors">
                    {news.title}
                  </h4>
                </Link>
                <p className="text-gray-600 mt-2 text-sm">{news.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
