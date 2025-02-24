"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaClipboardList,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaNewspaper,
  FaImages,
  FaVideo,
  FaGraduationCap,
  FaBell,
  FaSlidersH,
  FaUsers,
  FaThLarge,
} from "react-icons/fa";

export default function CategoriesDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    slug: "",
  });

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Không thể tải danh sách danh mục");
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError(`Lỗi khi tải dữ liệu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Mở modal chỉnh sửa
  const handleEdit = (category) => {
    setEditForm({
      id: category._id,
      name: category.name,
      slug: category.slug,
    });
    setIsModalOpen(true);
  };

  // Lưu chỉnh sửa
  const handleSave = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "PUT", // Giả định API sẽ hỗ trợ PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Không thể cập nhật danh mục");

      setCategories((prev) =>
        prev.map((cat) => (cat._id === editForm.id ? result.data : cat))
      );
      setIsModalOpen(false);
      alert("Cập nhật danh mục thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert(`Lỗi khi cập nhật: ${error.message}`);
    }
  };

  // Xóa danh mục
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa danh mục này không?")) return;

    try {
      const response = await fetch("/api/categories", {
        method: "DELETE", // Giả định API sẽ hỗ trợ DELETE
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Không thể xóa danh mục");

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      alert("Đã xóa danh mục thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert(`Lỗi khi xóa: ${error.message}`);
    }
  };

  // Menu sidebar
  const menuItems = [
    { icon: FaHome, title: "Dashboard", path: "/admin/dashboard" },
    { icon: FaImages, title: "Album ảnh", path: "/admin/albums" },
    { icon: FaClipboardList, title: "Danh mục", path: "/admin/categories" },
    { icon: FaGraduationCap, title: "Khóa học", path: "/admin/courses" },
    { icon: FaNewspaper, title: "Tin tức", path: "/admin/news" },
    { icon: FaBell, title: "Thông báo", path: "/admin/notifications" },
    { icon: FaImages, title: "Album ảnh", path: "/admin/photo-albums" },
    { icon: FaThLarge, title: "Layout ảnh", path: "/admin/picture-layout" },
    {
      icon: FaUsers,
      title: "Danh sách học viên",
      path: "/admin/registrations",
    },
    { icon: FaSlidersH, title: "Sliders", path: "/admin/sliders" },
    { icon: FaVideo, title: "Video", path: "/admin/videos" },
  ];

  const SidebarLink = ({ icon: Icon, title, path }) => (
    <Link
      href={path}
      className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all transform hover:scale-105
        ${
          path === "/admin/categories"
            ? "bg-blue-700 text-white shadow-lg"
            : "text-gray-300 hover:bg-blue-700 hover:text-white"
        }`}
    >
      <Icon className="w-6 h-6 text-white transition-colors duration-200" />
      <span className="font-semibold">{title}</span>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-blue-800 text-white shadow-lg
          transform transition-transform duration-300 ease-in-out z-40
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-blue-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <button
                className="lg:hidden text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <SidebarLink key={item.path} {...item} />
            ))}
          </nav>
          <div className="p-4 border-t border-blue-700">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg transition-colors hover:bg-blue-700"
            >
              <FaSignOutAlt className="w-6 h-6 text-white" />
              <span className="font-semibold">Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý danh mục</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-blue-800"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý danh mục</h1>
          <Link
            href="/admin/categories/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Thêm danh mục mới
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <p className="text-red-600 bg-red-100 p-4 rounded">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">Chưa có danh mục nào.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Tên danh mục</th>
                  <th className="border px-4 py-2 text-left">Slug</th>
                  <th className="border px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{category.name}</td>
                    <td className="border px-4 py-2">{category.slug}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-500 hover:underline"
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal chỉnh sửa */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">
                Chỉnh sửa danh mục
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) =>
                      setEditForm({ ...editForm, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
