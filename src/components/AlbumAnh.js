"use client";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const ImageCard = ({ image, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
    <div className="relative group">
      <Image
        src={image.image}
        alt={image.title}
        width={800}
        height={500}
        style={{ objectFit: "cover" }}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
        <p className="text-gray-200 text-sm">{image.description}</p>
      </div>
    </div>
  </div>
);

const PhotoDetail = ({ photo }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <Image
      src={photo.src}
      alt={photo.alt || "Photo"}
      width={800}
      height={500}
      style={{ objectFit: "cover" }}
      className="transition-transform duration-500 hover:scale-105"
    />
  </div>
);

export default function AlbumAnh() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/albums");
        if (!response.ok) throw new Error("Failed to fetch albums");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setAlbums(result.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setError("Có lỗi xảy ra khi tải album: " + error.message);
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
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedAlbum.title}
                </h2>
                <div className="h-1 w-20 bg-orange-500 mt-3"></div>
              </div>
              <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors group"
              >
                <span>Quay lại</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {selectedAlbum.photos.map((photo, index) => (
                <PhotoDetail key={index} photo={photo} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Album Ảnh</h2>
                <div className="h-1 w-20 bg-orange-500 mt-3"></div>
              </div>
              {/* Nút "Xem tất cả" có thể giữ hoặc bỏ nếu không cần */}
              <button
                onClick={() => console.log("Xem tất cả albums")}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors group"
              >
                <span>Xem tất cả</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {albums.slice(0, 6).map((album) => (
                <ImageCard
                  key={album.id || album._id}
                  image={album}
                  onClick={() => handleAlbumClick(album)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
