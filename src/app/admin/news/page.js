"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Lỗi từ API");
      setNews(result.data || []); // Lấy mảng data từ response
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Có lỗi xảy ra khi tải tin tức: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin tức này?")) {
      try {
        const response = await fetch("/api/news", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Gửi id trong body
        });
        if (!response.ok) throw new Error("Failed to delete news");
        const result = await response.json();
        if (!result.success)
          throw new Error(result.message || "Lỗi xóa tin tức");
        fetchNews(); // Refresh danh sách
      } catch (error) {
        console.error("Error deleting news:", error);
        setError("Có lỗi xảy ra khi xóa tin tức: " + error.message);
      }
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/news?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentStatus }), // Gửi trạng thái mới
      });
      if (!response.ok) throw new Error("Failed to update featured status");
      const result = await response.json();
      if (!result.success)
        throw new Error(result.message || "Lỗi cập nhật trạng thái");
      fetchNews(); // Refresh danh sách
    } catch (error) {
      console.error("Error updating featured status:", error);
      setError(
        "Có lỗi xảy ra khi cập nhật trạng thái nổi bật: " + error.message
      );
    }
  };

  const formatDate = (date) => {
    try {
      if (!date) return "N/A";
      const d = new Date(date);
      if (isNaN(d.getTime())) return "Invalid date";
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Quản lý tin tức</h1>
        <Link
          href="/admin/news/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm tin tức mới
        </Link>
      </div>
      {news.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          Chưa có tin tức nào.
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đăng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nổi bật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.views}</div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={() =>
                        handleToggleFeatured(item._id, item.featured)
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/news/edit/${item._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
