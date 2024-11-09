"use client";
import React from 'react';

const SPONSORS = [
  {
    id: 1,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 1"
  },
  {
    id: 2,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 2"
  },
  {
    id: 3,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 3"
  },
  {
    id: 4,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 4"
  },
  {
    id: 5,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 5"
  },
  {
    id: 6,
    logo: "/img/img000.jpg",
    alt: "Nhà tài trợ 6"
  }
];

const NhaTaiTro = () => {
  return (
    <div className="bg-gray-300 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.id} className="mx-4">
                <img src={sponsor.logo} alt={sponsor.alt} className="h-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS cho hiệu ứng chạy từ bên phải sang trái
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

export default NhaTaiTro;