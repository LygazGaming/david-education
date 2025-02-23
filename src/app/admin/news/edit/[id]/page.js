"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Sử dụng useParams
import { Editor } from "@tinymce/tinymce-react";

export default function EditNews() {
  const router = useRouter();
  const { id } = useParams(); // Lấy id từ URL params
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    excerpt: "",
    content: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/news?id=${id}`); // Dùng query id
        if (!response.ok) throw new Error("Failed to fetch news");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setFormData(result.data);
        setImagePreview(result.data.image);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Có lỗi xảy ra khi tải tin tức: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const uploadImage = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result;
          const response = await fetch("/api/news/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: base64data }),
          });
          const result = await response.json();
          if (response.ok && result.success) {
            resolve(result.url);
          } else {
            reject(new Error(result.message || "Lỗi upload ảnh"));
          }
        } catch (error) {
          reject(error);
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile); // Upload ảnh mới nếu có
      }

      const payload = {
        ...formData,
        image: imageUrl,
        date: new Date(formData.date).toISOString(), // Giữ nguyên ngày cũ hoặc cập nhật
      };
      console.log("Submitting payload:", payload);

      const response = await fetch(`/api/news?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        router.push("/admin/news");
      } else {
        throw new Error(result.message || "Không thể cập nhật tin tức");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi cập nhật tin tức: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Sửa tin tức</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh chính
          </label>
          <div className="mt-1 flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tóm tắt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung
          </label>
          <Editor
            apiKey="6ujpn4iau16cit8miznmarmlivnr81nlduo03lpu9m4qffq4"
            initialValue={formData.content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | image",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              images_upload_handler: async (blobInfo, success, failure) => {
                try {
                  const url = await uploadImage(blobInfo.blob());
                  success(url);
                } catch (error) {
                  failure("Lỗi upload ảnh: " + error.message);
                }
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Tin tức nổi bật
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Đang xử lý..." : "Cập nhật tin tức"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/news")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
