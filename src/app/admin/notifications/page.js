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

export default function NotificationsDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState(""); // Thay editMessage thành editText

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  // Lấy danh sách thông báo
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) throw new Error("Không thể tải danh sách thông báo");
        const result = await response.json();
        console.log("Notifications data:", result);
        setNotifications(result);
      } catch (err) {
        setError(`Lỗi khi tải dữ liệu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Xử lý chỉnh sửa thông báo
  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText || ""); // Dùng text thay vì message
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text: editText }), // Thay message thành text
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Không thể cập nhật thông báo");

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, text: editText } : notif
        )
      );
      setEditingId(null);
      setEditText("");
      alert("Cập nhật thông báo thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert(`Lỗi khi cập nhật: ${error.message}`);
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
          path === "/admin/notifications"
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
          <h1 className="text-3xl font-semibold">Quản lý thông báo</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-blue-800"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý thông báo</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <p className="text-red-600 bg-red-100 p-4 rounded">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-600">Chưa có thông báo nào.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Thông báo</th>
                  <th className="border px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notif) => (
                  <tr key={notif._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {editingId === notif._id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        notif.text || "Không có nội dung" // Dùng text thay vì message
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-3">
                        {editingId === notif._id ? (
                          <button
                            onClick={() => handleSave(notif._id)}
                            className="text-green-500 hover:underline"
                          >
                            Lưu
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(notif._id, notif.text)}
                            className="text-blue-500 hover:underline"
                          >
                            Chỉnh sửa
                          </button>
                        )}
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
