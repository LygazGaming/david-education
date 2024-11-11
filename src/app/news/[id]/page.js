"use client"; // Đánh dấu file này là Client Component

import { useParams } from 'next/navigation'; // Sử dụng useParams từ next/navigation
import NEWS_DATA from '../../../data/newsData';
import CategoryMenu from '../../../components/CategoryMenu'; // Import CategoryMenu
import { FaCalendarAlt, FaEye } from 'react-icons/fa'; // Import các icon cần thiết

const NewsDetail = () => {
  const { id } = useParams(); // Lấy ID từ params

  // Tìm tin tức dựa trên ID
  const news = NEWS_DATA.find(news => news.id.toString() === id);

  if (!news) {
    return <div>404 - Not Found</div>; // Hiển thị thông báo nếu không tìm thấy tin tức
  }

  return (
    <div className="flex max-w-6xl mx-auto px-4 py-12">
      <div className="w-1/4 pr-4"> {/* Thêm khoảng cách bên phải cho CategoryMenu */}
        <CategoryMenu /> {/* Hiển thị thanh danh mục ở bên trái */}
      </div>
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            {news.date}
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
    </div>
  );
};

export default NewsDetail;