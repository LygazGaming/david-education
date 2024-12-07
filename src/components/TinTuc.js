"use client";
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCalendarAlt, FaEye } from 'react-icons/fa';
import Link from 'next/link';

// Hàm định dạng ngày
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // Định dạng theo dd/MM/yyyy
};

// Component NewsCard
const NewsCard = ({ news, featured = false }) => {
  const formattedDate = formatDate(news.date); // Định dạng ngày

  if (featured) {
    return (
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="md:w-1/2 relative overflow-hidden">
          <Link href={`/news/${news._id}`}>
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-orange-500" />
                {formattedDate} {/* Hiển thị ngày đã định dạng */}
              </span>
              <span className="flex items-center gap-1">
                <FaEye className="text-orange-500" />
                {news.views} lượt xem
              </span>
            </div>
            <Link href={`/news/${news._id}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-orange-500 transition-colors">
                {news.title}
              </h3>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              {news.excerpt}
            </p>
          </div>
          <button className="flex items-center gap-2 text-orange-500 font-semibold mt-4 group">
            <Link href={`/news/${news._id}`}>
              Xem chi tiết
            </Link>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link href={`/news/${news._id}`}>
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            {formattedDate} {/* Hiển thị ngày đã định dạng */}
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
        <p className="text-gray-600 mt-2 text-sm">
          {news.excerpt}
        </p>
        <button className="flex items-center gap-2 text-orange-500 font-semibold mt-4 text-sm group">
          <Link href={`/news/${news._id}`}>
            Xem thêm
          </Link>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Component TinTuc
export default function TinTuc() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news'); // Đảm bảo rằng đường dẫn API là chính xác
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu');
        }
        const data = await response.json();
        setNewsData(data); // Cập nhật state với dữ liệu nhận được từ API
      } catch (error) {
        setError(error.message); // Lưu thông báo lỗi nếu có
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false
      }
    };

    fetchNews(); // Gọi hàm fetchNews khi component được mount
  }, []);

  if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  if (error) return <div className="text-red-500">{error}</div>; // Hiển thị thông báo lỗi nếu có

  // Kiểm tra nếu không có tin tức nào
  if (newsData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg">Không có tin tức nào để hiển thị.</div>
      </div>
    );
  }

  const featuredNews = newsData.find(news => news.featured);
  const regularNews = newsData.filter(news => !news.featured);

  // Chỉ lấy 3 tin tức đầu tiên từ regularNews
  const displayedRegularNews = regularNews.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Tin tức</h2>
          <div className="h-1 w-20 bg-orange-500 mt-2"></div>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors group">
          <Link href="/news"> {/* Cập nhật đường dẫn nếu cần */}
            <span>Xem tất cả</span>
          </Link>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="space-y-8">
        {featuredNews && <NewsCard news={featuredNews} featured={true} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRegularNews.map(news => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}