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
  FaChartLine,
  FaUserGraduate,
  FaPhotoVideo,
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    courses: 0,
    categories: 0,
    news: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    } else {
      fetchStats();
    }
  }, [router]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [coursesRes, categoriesRes, newsRes, usersRes] = await Promise.all([
        fetch("/api/courses", { cache: "no-store" }).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch("/api/categories", { cache: "no-store" }).then((res) =>
          res.ok ? res.json() : { success: false, data: [] }
        ),
        fetch("/api/news", { cache: "no-store" }).then((res) =>
          res.ok ? res.json() : []
        ),
        fetch("/api/users", { cache: "no-store" }).then((res) =>
          res.ok ? res.json() : []
        ),
      ]);

      setStats({
        courses: Array.isArray(coursesRes) ? coursesRes.length : 0,
        categories: categoriesRes.success ? categoriesRes.data.length : 0,
        news: Array.isArray(newsRes) ? newsRes.length : 0,
        users: Array.isArray(usersRes) ? usersRes.length : 0,
      });
    } catch (err) {
      setError("Không thể tải dữ liệu thống kê: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
      className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300
        ${
          path === "/admin/dashboard"
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
            : "text-gray-200 hover:bg-blue-700 hover:text-white"
        }`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-medium">{title}</span>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div
      className={`p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${color}`}
    >
      <div className="flex items-center space-x-4">
        <Icon className="w-10 h-10 text-white" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-2xl
          transform transition-transform duration-300 ease-in-out z-40
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-blue-600">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-wide">
                Admin Panel
              </h2>
              <button
                className="lg:hidden text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-3">
            {menuItems.map((item) => (
              <SidebarLink key={item.path} {...item} />
            ))}
          </nav>
          <div className="p-4 border-t border-blue-600">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 text-gray-200 hover:text-white w-full px-4 py-3 rounded-lg
                transition-all duration-300 hover:bg-blue-800"
            >
              <FaSignOutAlt className="w-6 h-6" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="sticky top-0 z-20 bg-white border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              className="text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <FaBell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <span className="text-gray-700 font-medium">Xin chào, Admin</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={FaGraduationCap}
                  title="Khóa học"
                  value={stats.courses}
                  color="bg-gradient-to-r from-blue-500 to-blue-700"
                />
                <StatCard
                  icon={FaClipboardList}
                  title="Danh mục"
                  value={stats.categories}
                  color="bg-gradient-to-r from-green-500 to-green-700"
                />
                <StatCard
                  icon={FaNewspaper}
                  title="Tin tức"
                  value={stats.news}
                  color="bg-gradient-to-r from-yellow-500 to-yellow-700"
                />
                <StatCard
                  icon={FaUsers}
                  title="Học viên"
                  value={stats.users}
                  color="bg-gradient-to-r from-purple-500 to-purple-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/admin/courses"
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-4">
                    <FaGraduationCap className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Quản lý khóa học
                      </h3>
                      <p className="text-gray-600">Thêm, sửa, xóa khóa học</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/admin/categories"
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50"
                >
                  <div className="flex items-center space-x-4">
                    <FaClipboardList className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Quản lý danh mục
                      </h3>
                      <p className="text-gray-600">Tạo và chỉnh sửa danh mục</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/admin/news"
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow-50"
                >
                  <div className="flex items-center space-x-4">
                    <FaNewspaper className="w-8 h-8 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Quản lý tin tức
                      </h3>
                      <p className="text-gray-600">
                        Đăng bài và cập nhật tin tức
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
