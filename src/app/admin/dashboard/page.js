"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaNewspaper,
  FaImages,
  FaVideo,
  FaGraduationCap,
  FaHandshake,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    news: { total: 0, featured: 0 },
    albums: { total: 0 },
    courses: { total: 0, featured: 0 },
    videos: { total: 0, featured: 0 },
    sponsors: { total: 0, active: 0 },
    notification: { total: 0, active: 0 },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [news, albums, courses, videos, sponsors] = await Promise.all([
          fetch("/api/news").then((res) => res.json()),
          fetch("/api/album").then((res) => res.json()),
          fetch("/api/course").then((res) => res.json()),
          fetch("/api/video").then((res) => res.json()),
          fetch("/api/sponsor").then((res) => res.json()),
          fetch("/api/notification").then((res) => res.json()),
        ]);

        setStats({
          news: {
            total: news.length,
            featured: news.filter((item) => item.featured).length,
          },
          albums: {
            total: albums.albums ? albums.albums.length : 0,
          },
          courses: {
            total: courses.length,
            featured: courses.filter((item) => item.featured).length,
          },
          videos: {
            total: videos.videos ? videos.videos.length : 0,
            featured: videos.videos
              ? videos.videos.filter((item) => item.featured).length
              : 0,
          },
          sponsors: {
            total: sponsors.length,
            active: sponsors.filter((item) => item.active).length,
          },
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchAllStats();
  }, []);

  const StatCard = ({
    title,
    total,
    featured,
    icon: Icon,
    link,
    featuredLink,
    featuredText,
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Icon className="text-2xl text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-3xl font-bold text-blue-600 mb-2">{total}</p>
      {featured !== undefined && (
        <p className="text-lg text-green-600 mb-4">
          {featuredText}: {featured}
        </p>
      )}
      <div className="space-y-2">
        <Link href={link} className="text-blue-500 hover:underline block">
          Quản lý {title} →
        </Link>
        {featuredLink && (
          <Link
            href={featuredLink}
            className="text-green-500 hover:underline block"
          >
            Xem {featuredText} →
          </Link>
        )}
      </div>
    </div>
  );

  const menuItems = [
    { icon: FaHome, title: "Dashboard", path: "/admin/dashboard" },
    { icon: FaNewspaper, title: "Tin tức", path: "/admin/news" },
    { icon: FaImages, title: "Album ảnh", path: "/admin/albums" },
    { icon: FaGraduationCap, title: "Khóa học", path: "/admin/courses" },
    { icon: FaVideo, title: "Video", path: "/admin/videos" },
    { icon: FaHandshake, title: "Nhà tài trợ", path: "/admin/sponsors" },
    { icon: FaBell, title: "Thông báo", path: "/admin/notification" },
  ];

  const SidebarLink = ({ icon: Icon, title, path }) => (
    <Link
      href={path}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        ${
          path === "/admin/dashboard"
            ? "bg-blue-700 text-white"
            : "text-gray-300 hover:bg-blue-700 hover:text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex">
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
              className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg
                transition-colors hover:bg-blue-700"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-white border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              className="text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Tin tức"
              total={stats.news.total}
              featured={stats.news.featured}
              icon={FaNewspaper}
              link="/admin/news"
              featuredLink="/admin/news?filter=featured"
              featuredText="Tin nổi bật"
            />

            <StatCard
              title="Album ảnh"
              total={stats.albums.total}
              icon={FaImages}
              link="/admin/albums"
            />
            <StatCard
              title="Khóa học"
              total={stats.courses.total}
              featured={stats.courses.featured}
              icon={FaGraduationCap}
              link="/admin/courses"
              featuredLink="/admin/courses?filter=featured"
              featuredText="Khóa học nổi bật"
            />

            <StatCard
              title="Video"
              total={stats.videos.total}
              featured={stats.videos.featured}
              icon={FaVideo}
              link="/admin/videos"
              featuredLink="/admin/videos?filter=featured"
              featuredText="Video nổi bật"
            />

            <StatCard
              title="Nhà tài trợ"
              total={stats.sponsors.total}
              featured={stats.sponsors.active}
              icon={FaHandshake}
              link="/admin/sponsors"
              featuredText="Đang hoạt động"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
