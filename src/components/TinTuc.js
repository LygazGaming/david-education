// components/TinTuc.js
"use client";
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function TinTuc() {
  return (
    <div className="container px-4 py-8 bg-gray-50 rounded-lg shadow-lg mx-auto">
      {/* Header section with title and button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-primary">Tin tức</h2>
        <button className="flex items-center bg-secondary text-white px-5 py-2 rounded-lg shadow hover:bg-secondary-dark transition">
          <span className="mr-2">Xem tất cả</span>
          <FaArrowRight />
        </button>
      </div>
      <hr className="border-t-2 border-secondary mb-6" />
      {/* Featured news section */}
      <div className="flex flex-col md:flex-row mb-8 bg-white rounded-lg shadow-lg p-4">
        <img 
          src="/img/img005.jpg" 
          alt="Tin tức" 
          className="w-full md:w-1/2 h-[300px] object-cover rounded-lg" 
        />
        <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-primary">Trái bóng Molten "Đi cùng" VietGoal Cup 2024</h3>
            <p className="mt-2 text-gray-700">
            Vượt qua 858km từ Sài Gòn sôi động tới thành phố biển Đà Nẵng, trái bóng Molten tiếp tục trở thành 
              “người bạn đồng hành” cùng với các cầu thủ nhí tại Giải VietGoal Cup 2024 Khu vực miền Trung 
              tiếp nối những thành công cùng sự đón nhận, hưởng ứng nhiệt tình từ các bạn nhỏ và gia đình sau 
              Giải VietGoal 2024 Khu vực miền Nam vừa kết thúc 1 tuần trước đó.
            </p>
          </div>
          <button className="flex items-center self-start mt-4 bg-secondary text-white px-5 py-2 rounded-lg shadow hover:bg-secondary-dark transition">
            <span className="mr-2">Xem chi tiết</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* News articles section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Article 1 */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
          <img src="/img/img055.jpg" alt="Tin tức 1" className="w-full h-auto object-cover rounded-lg" />
          <h4 className="font-semibold text-primary mt-4">Hành trình xin chữ ký Quang Hải</h4>
          <p className="text-gray-600 mt-2">Tham gia sự kiện với các Công an Hà Nội FC...</p>
          <button className="mt-4 bg-transparent text-secondary">
            <FaArrowRight className="text-xl" />
          </button>
        </div>
        
        {/* Article 2 */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
          <img src="/img/img025.jpg" alt="Tin tức 2" className="w-full h-auto object-cover rounded-lg" />
          <h4 className="font-semibold text-primary mt-4">Hành trình xin chữ ký Quang Hải</h4>
          <p className="text-gray-600 mt-2">Tham gia sự kiện với các Công an Hà Nội FC...</p>
          <button className="mt-4 bg-transparent text-secondary">
            <FaArrowRight className="text-xl" />
          </button>
        </div>
        
        {/* Article 3 */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
          <img src="/img/img088.jpg" alt="Tin tức 3" className="w-full h-auto object-cover rounded-lg" />
          <h4 className="font-semibold text-primary mt-4">Hành trình xin chữ ký Quang Hải</h4>
          <p className="text-gray-600 mt-2">Tham gia sự kiện với các Công an Hà Nội FC...</p>
          <button className="mt-4 bg-transparent text-secondary">
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
