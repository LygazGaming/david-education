// /src/app/news/category/[slug]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryNews() {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryAndNews = async () => {
      try {
        setLoading(true);

        // Lấy danh mục theo slug
        const catResponse = await fetch(`/api/categories?slug=${slug}`);
        const catResult = await catResponse.json();
        if (!catResult.success || !catResult.data) {
          throw new Error("Danh mục không tồn tại");
        }
        const categoryData = catResult.data;
        setCategory(categoryData);

        // Lấy tin tức theo category ID
        const newsResponse = await fetch(
          `/api/news?category=${categoryData._id}`
        );
        const newsResult = await newsResponse.json();
        if (!newsResult.success)
          throw new Error(newsResult.message || "Lỗi khi lấy tin tức");
        setNews(newsResult.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCategoryAndNews();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {category
          ? `Tin tức danh mục: ${category.name}`
          : "Danh mục không xác định"}
      </h1>
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link href={`/news/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-6">
                <Link href={`/news/${item._id}`}>
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{formatDate(item.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{item.views} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          Chưa có tin tức nào trong danh mục này.
        </p>
      )}
    </div>
  );
}
