// components/CategoryMenu.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Không thể lấy danh mục");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setCategories(result.data || []); // Lấy mảng data từ result
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-gray-800 text-left">
          Danh mục tin tức
        </h2>
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-gray-800 text-left">
          Danh mục tin tức
        </h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-left border-b pb-2 border-gray-200">
        Danh Mục Tin Tức
      </h2>
      <ul className="space-y-3">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link
                href={`/news/category/${category.slug}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-sm md:text-base font-medium"
              >
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm">Chưa có danh mục</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryMenu;
