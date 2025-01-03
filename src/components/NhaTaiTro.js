"use client";
import React, { useEffect } from "react";

const SPONSORS = [
  {
    id: 1,
    logo: "/images/nhataitro/1.jpg",
    alt: "Nhà tài trợ 1",
  },
  {
    id: 2,
    logo: "/images/nhataitro/2.jpg",
    alt: "Nhà tài trợ 2",
  },
  {
    id: 3,
    logo: "/images/nhataitro/3.jpg",
    alt: "Nhà tài trợ 3",
  },
  {
    id: 4,
    logo: "/images/nhataitro/4.jpg",
    alt: "Nhà tài trợ 4",
  },
  {
    id: 5,
    logo: "/images/nhataitro/5.jpg",
    alt: "Nhà tài trợ 5",
  },
  {
    id: 6,
    logo: "/images/nhataitro/6.jpg",
    alt: "Nhà tài trợ 6",
  },
  {
    id: 7,
    logo: "/images/nhataitro/7.jpg",
    alt: "Nhà tài trợ 7",
  },
  {
    id: 8,
    logo: "/images/nhataitro/8.jpg",
    alt: "Nhà tài trợ 8",
  },
  {
    id: 9,
    logo: "/images/nhataitro/9.jpg",
    alt: "Nhà tài trợ 9",
  },
  {
    id: 10,
    logo: "/images/nhataitro/10.jpg",
    alt: "Nhà tài trợ 10",
  },
  {
    id: 11,
    logo: "/images/nhataitro/11.jpg",
    alt: "Nhà tài trợ 11",
  },
];

const NhaTaiTro = () => {
  useEffect(() => {
    const styles = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="bg-gray-100 py-8 md:py-16">
      <div className="w-full overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Đối Tác & Nhà Tài Trợ
        </h2>

        <div className="relative">
          <div className="flex animate-marquee">
            <div className="flex">
              {SPONSORS.map((sponsor) => (
                <div key={sponsor.id} className="mx-4 w-[150px] md:w-[250px]">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.alt}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              {SPONSORS.map((sponsor) => (
                <div
                  key={`${sponsor.id}-duplicate`}
                  className="mx-4 w-[150px] md:w-[250px]"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.alt}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhaTaiTro;
