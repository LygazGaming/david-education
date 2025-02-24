"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

export default function EditNews() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    excerpt: "",
    content: "",
    featured: false,
    date: "",
    category: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/news?id=${id}`);
        const result = await response.json();
        console.log("Fetched news:", result);
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setFormData({
          ...result.data,
          date: new Date(result.data.date).toISOString().split("T")[0],
        });
        setImagePreview(result.data.image);
      } catch (error) {
        setError("Có lỗi khi tải tin tức: " + error.message);
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
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/news/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.ok && result.success) return result.url;
    throw new Error(result.message || "Lỗi upload ảnh");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      if (!imageUrl) throw new Error("Vui lòng chọn ảnh chính");

      const payload = {
        title: formData.title,
        image: imageUrl,
        excerpt: formData.excerpt,
        content: formData.content,
        date: formData.date || new Date().toISOString(),
        featured: formData.featured,
        category: formData.category || null,
      };
      console.log("PUT request URL:", `/api/news?id=${id}`);
      console.log("PUT payload:", payload);

      const response = await fetch(`/api/news?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("PUT response:", result);

      if (response.ok && result.success) {
        router.push("/admin/news");
      } else {
        throw new Error(result.message || "Không thể cập nhật tin tức");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi khi cập nhật tin tức: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) return <div className="text-center py-12">Đang tải...</div>;

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
              className="h-20 w-20 object-cover rounded mt-2"
            />
          )}
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
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            initialValue={formData.content}
            init={{
              height: 500,
              menubar: true,
              plugins:
                "advlist autolink lists link image charmap preview anchor ...",
              toolbar: "undo redo | blocks | bold italic forecolor | ...",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              images_upload_handler: async (blobInfo) =>
                await uploadImage(blobInfo.blob()),
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
            className="h-4 w-4"
          />
          <label className="ml-2">Tin tức nổi bật</label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitting ? "Đang cập nhật..." : "Cập nhật tin tức"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/news")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
