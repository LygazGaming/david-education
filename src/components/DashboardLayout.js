"use client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const navItems = [
    { name: "Quản lý tin tức", href: "/admin/news" },
    { name: "Thêm tin tức mới", href: "/admin/news/create" },
    { name: "Danh mục", href: "/admin/categories" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600">Admin Dashboard</h2>
        </div>
        <nav className="px-2 space-y-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`block px-4 py-2 rounded-lg text-gray-700 ${
                  router.pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
