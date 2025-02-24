"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewsDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa tin này không?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/news?id=${id}`, {
        // Sửa thành query
        method: "DELETE",
      });
      const result = await response.json();
      console.log("DELETE response:", result);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Quản lý tin tức</h1>
        <Link
          href="/admin/news/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm tin tức mới
        </Link>
      </div>
      {error ? (
        <p className="text-red-600 bg-red-100 p-4 rounded">{error}</p>
      ) : newsList.length === 0 ? (
        <p className="text-gray-600">Chưa có tin tức nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
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
    </div>
  );
}
