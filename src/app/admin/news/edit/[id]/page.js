// src/app/admin/news/edit/[id]/page.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';

export default function EditNews() {
    const editorRef = useRef(null);
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        excerpt: '',
        content: '',
        date: '',
        featured: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNews();
    }, [id]);

    const fetchNews = async () => {
        try {
            const response = await fetch(`/api/news/${id}`);
            if (response.ok) {
                const data = await response.json();
                // Format date from ISO to dd/mm/yyyy
                const date = new Date(data.date);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                
                setFormData({
                    ...data,
                    date: formattedDate
                });
            } else {
                setError('Không tìm thấy tin tức');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tải tin tức');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/news/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/news');
            } else {
                const data = await response.json();
                setError(data.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật tin tức');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) return <div>Loading...</div>;

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
                        URL Hình ảnh
                    </label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
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
                        apiKey='6ujpn4iau16cit8miznmarmlivnr81nlduo03lpu9m4qffq4'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={formData.content}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            file_picker_types: 'image',
                            images_upload_handler: async function (blobInfo, success, failure) {
                                try {
                                    const formData = new FormData();
                                    formData.append('file', blobInfo.blob(), blobInfo.filename());
                                    
                                    const response = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData
                                    });
                                    
                                    const data = await response.json();
                                    success(data.url);
                                } catch (e) {
                                    failure('Image upload failed');
                                }
                            }
                        }}
                        onEditorChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày đăng (dd/mm/yyyy)
                    </label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        placeholder="15/03/2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        {loading ? 'Đang xử lý...' : 'Cập nhật'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/news')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}