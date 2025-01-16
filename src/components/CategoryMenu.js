import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-800 text-left">
        Danh mục tin tức
      </h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/news/category/${category.slug}`}
              className="block text-blue-600 hover:underline transition-colors duration-200 text-left"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
