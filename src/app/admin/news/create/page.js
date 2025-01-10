"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateNews() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    excerpt: "",
    content: "",
    featured: false, // Mặc định là không tích
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = (content, editor) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const uploadResponse = await fetch("/api/news/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(
            `Lỗi upload ảnh: ${errorData.message || uploadResponse.statusText}`
          );
        }
        const imageData = await uploadResponse.json();
        imageUrl = imageData.url;
      }

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          date: new Date().setHours(0, 0, 0, 0),
        }),
      });

      if (response.ok) {
        router.push("/admin/news");
      } else {
        const data = await response.json();
        setError(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error details:", error);
      setError(`Lỗi: ${error.message}`);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Thêm tin tức mới</h1>
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
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | image",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              file_picker_types: "image",
              images_upload_handler: async function (
                blobInfo,
                success,
                failure
              ) {
                try {
                  const formData = new FormData();
                  formData.append("file", blobInfo.blob(), blobInfo.filename());

                  const response = await fetch("/api/news/upload", {
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                      `Upload failed: ${
                        errorData.message || response.statusText
                      }`
                    );
                  }

                  const data = await response.json();
                  success(data.url);
                } catch (e) {
                  console.error("Image upload error:", e);
                  failure(`Lỗi upload ảnh: ${e.message}`);
                }
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Đang xử lý..." : "Thêm tin tức"}
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
