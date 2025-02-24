"use client";
import React from "react";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";
import VIDEO_DATA from "../../data/videosData";
export default function training_videos() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Tất cả Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_DATA.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/videos/${video.id}`}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-5">
              <h4 className="font-bold text-gray-800 hover:text-orange-500 transition-colors">
                {video.title}
              </h4>
              <p className="text-gray-600 mt-2 text-sm">{video.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-500" />
                  {/* Thay thế bằng thông tin ngày nếu có */}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye className="text-orange-500" />
                  {video.views} lượt xem
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
