"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PhotoAlbum() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/photo-albums");
        if (!response.ok) throw new Error("Failed to fetch photo albums");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setAlbums(result.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setError("Có lỗi xảy ra khi tải danh sách album: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleBack = () => {
    setSelectedAlbum(null);
  };

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {selectedAlbum ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedAlbum.title}
              </h2>
              <button
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Quay lại danh sách album
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {selectedAlbum.photos.map((photo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt || selectedAlbum.title}
                    width={800}
                    height={500}
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Tất cả album ảnh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {albums.map((album) => (
                <div
                  key={album.id || album._id} // Dùng _id nếu từ MongoDB
                  onClick={() => handleAlbumClick(album)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={album.image}
                    alt={album.title}
                    width={800}
                    height={500}
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {album.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{album.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
