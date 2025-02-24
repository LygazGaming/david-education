"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaNewspaper,
  FaImages,
  FaVideo,
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaBell,
  FaSlidersH,
  FaUsers,
  FaThLarge,
  FaClipboardList,
} from "react-icons/fa";

export default function NewsDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  // Lấy danh sách tin tức
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setNewsList(result.data);
      } catch (err) {
        setError(`Lỗi khi tải dữ liệu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Xử lý xóa tin tức
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa tin này không?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/news?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setNewsList((prev) => prev.filter((news) => news._id !== id));
        alert("Đã xóa tin tức thành công!");
      } else {
        throw new Error(result.message || "Không thể xóa tin tức");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert(`Lỗi khi xóa: ${error.message}`);
    } finally {
      setDeletingId(null);
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
          path === "/admin/news"
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
          {/* Sidebar Header */}
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

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <SidebarLink key={item.path} {...item} />
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-blue-700">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg
                transition-colors hover:bg-blue-700"
            >
              <FaSignOutAlt className="w-6 h-6 text-white" />
              <span className="font-semibold">Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý tin tức</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-blue-800"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý tin tức</h1>
          <Link
            href="/admin/news/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Thêm tin tức mới
          </Link>
        </div>

        {/* News Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <p className="text-red-600 bg-red-100 p-4 rounded">{error}</p>
        ) : newsList.length === 0 ? (
          <p className="text-gray-600">Chưa có tin tức nào.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Tiêu đề</th>
                  <th className="border px-4 py-2 text-left">Tóm tắt</th>
                  <th className="border px-4 py-2 text-left">Nổi bật</th>
                  <th className="border px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 truncate max-w-xs">
                      {news.title}
                    </td>
                    <td className="border px-4 py-2 truncate max-w-md">
                      {news.excerpt}
                    </td>
                    <td className="border px-4 py-2">
                      {news.featured ? "Có" : "Không"}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/news/edit/${news._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Chỉnh sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(news._id)}
                          disabled={deletingId === news._id}
                          className={`text-red-500 hover:underline ${
                            deletingId === news._id ? "opacity-50" : ""
                          }`}
                        >
                          {deletingId === news._id ? "Đang xóa..." : "Xóa"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
