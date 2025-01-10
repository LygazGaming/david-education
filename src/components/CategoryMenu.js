import Link from "next/link";

const categories = [
  { id: 1, name: "Thông Tin Tổng Hợp Cầu Lông", path: "/news/1" },
  { id: 2, name: "Câu Lạc Bộ - Nhóm Cầu Lông", path: "/news/2" },
  { id: 3, name: "Thầy Dạy Đánh Cầu Lông", path: "/news/3" },
  { id: 4, name: "Tin Tức Cầu Lông", path: "/news/4" },
  { id: 5, name: "Kỹ Thuật Đánh Cầu Lông Nâng Cao", path: "/news/4" },
  { id: 6, name: "Giải Đấu Cầu Lông Quốc Gia", path: "/news/2" },
  { id: 7, name: "Các Mẫu Vợt Cầu Lông Mới Nhất", path: "/news/1" },
  {
    id: 8,
    name: "Thể Lực Và Chế Độ Ăn Uống Cho Vận Động Viên Cầu Lông",
    path: "/news/1",
  },
  { id: 9, name: "Đánh Giá Sân Cầu Lông Uy Tín", path: "/news/4" },
  {
    id: 10,
    name: "Top 10 Vận Động Viên Cầu Lông Hàng Đầu Thế Giới",
    path: "/news/3",
  },
];

const CategoryMenu = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-800 text-left">
        Danh mục tin tức
      </h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={category.path}
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
