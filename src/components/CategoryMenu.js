import Link from 'next/link';

const categories = [
  { id: 1, name: 'Thông Tin Tổng Hợp Cầu Lông', path: '/news/1' },
  { id: 2, name: 'Câu Lạc Bộ - Nhóm Cầu Lông', path: '/news/2' },
  { id: 3, name: 'Thầy Dạy Đánh Cầu Lông', path: '/news/3' },
  { id: 4, name: 'Tin tức cầu lông', path: '/news/4' },
];

const CategoryMenu = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-800 text-center md:text-left">Danh mục tin tức</h2>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.id}>
            <Link href={category.path} className="block text-blue-600 hover:underline transition-colors duration-200 text-center md:text-left">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;