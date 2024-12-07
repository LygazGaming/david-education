// src/app/news/[id]/page.js
"use client"; // Đánh dấu file này là Client Component

import { useParams } from 'next/navigation'; // Sử dụng useParams từ next/navigation
import CategoryMenu from '../../../components/CategoryMenu'; // Import CategoryMenu
import { FaCalendarAlt, FaEye } from 'react-icons/fa'; // Import các icon cần thiết
import React, { useState, useEffect } from 'react';

const NewsDetail = () => {
  const { id } = useParams(); // Lấy ID từ params
  const [news, setNews] = useState(null); // State để lưu tin tức
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
  const [error, setError] = useState(''); // State để lưu thông báo lỗi

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${id}`); // Gọi API để lấy tin tức theo ID
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu');
        }
        const data = await response.json();
        setNews(data); // Cập nhật state với dữ liệu nhận được từ API
      } catch (error) {
        setError(error.message); // Lưu thông báo lỗi nếu có
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false
      }
    };

    fetchNews(); // Gọi hàm fetchNews khi component được mount
  }, [id]);

  useEffect(() => {
    const increaseViews = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/news/${id}/view`, {
            method: 'PUT',
          });

          if (!response.ok) {
            console.error('Failed to increase views');
          }
        } catch (error) {
          console.error('Error increasing views:', error);
        }
      }
    };

    increaseViews(); // Tăng lượt xem khi ID thay đổi
  }, [id]);

  if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  if (error) return <div className="text-red-500">{error}</div>; // Hiển thị thông báo lỗi nếu có
  if (!news) return <div>404 - Not Found</div>; // Hiển thị thông báo nếu không tìm thấy tin tức

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-12"> {/* Thay đổi layout cho responsive */}
      <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-md md:order-1"> {/* Tin tức chiếm toàn bộ chiều rộng */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            {new Date(news.date).toLocaleDateString()} {/* Định dạng ngày tháng */}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-orange-500" />
            {news.views} lượt xem
          </span>
        </div>
        <img src={news.image} alt={news.title} className="w-full h-[400px] object-cover mb-4" />
        <div className="text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: news.content }} />
        {news.images && news.images.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index + 1}`} className="w-full h-auto mt-4" />
        ))}
      </div>
      <div className="w-full md:w-1/4 pr-4 hidden md:block"> {/* Ẩn danh mục trên mobile */}
        <CategoryMenu /> {/* Hiển thị thanh danh mục ở bên trái trên PC và iPad */}
      </div>
      <div className="w-full md:hidden mt-4"> {/* Danh mục nằm dưới bài viết trên mobile */}
        <CategoryMenu /> {/* Hiển thị thanh danh mục ở dưới cùng trên mobile */}
      </div>
    </div>
  );
};

export default NewsDetail;