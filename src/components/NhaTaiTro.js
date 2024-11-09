"use client";
import React, { useEffect } from "react";

const SPONSORS = [
  {
    id: 1,
    logo: "/img/img003.jpg",
    alt: "Nhà tài trợ 1",
  },
  {
    id: 2,
    logo: "/img/img008.jpg",
    alt: "Nhà tài trợ 2",
  },
  {
    id: 3,
    logo: "/img/img016.jpg",
    alt: "Nhà tài trợ 3",
  },
  {
    id: 4,
    logo: "/img/img037.jpg",
    alt: "Nhà tài trợ 4",
  },
  {
    id: 5,
    logo: "/img/img084.jpg",
    alt: "Nhà tài trợ 5",
  },
  {
    id: 6,
    logo: "/img/img105.jpg",
    alt: "Nhà tài trợ 6",
  },
];

const NhaTaiTro = () => {
  // Sử dụng useEffect để áp dụng CSS động
  useEffect(() => {
    const styles = `
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      .animate-marquee {
        animation: marquee 20s linear infinite; /* Thay đổi tốc độ ở đây */
      }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Cleanup khi component unmount (gỡ bỏ style để tránh rò rỉ bộ nhớ)
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="bg-gray-300 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden">
          {/* Phần marquee */}
          <div className="flex animate-marquee whitespace-nowrap">
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.id} className="mx-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.alt}
                  className="h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhaTaiTro;
