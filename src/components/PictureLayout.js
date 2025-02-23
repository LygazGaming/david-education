"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faUsers,
  faBook,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const MainFeature = ({ data }) => (
  <div className="relative w-full h-[500px]">
    <img src={data.image} alt="" className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 w-1/2 bg-black/70 p-6">
      <p className="text-white text-lg">{data.title}</p>
    </div>
  </div>
);

const MembershipSection = ({ data }) => (
  <div className="grid grid-cols-2 gap-0">
    {data.map((item, index) => (
      <div
        key={index}
        className={`${item.bgColor} text-center aspect-square relative`}
      >
        {item.title ? (
          <>
            <div className="p-4 md:p-8 h-full flex items-center justify-center">
              <h3 className="text-white text-xs md:text-lg lg:text-xl font-normal leading-relaxed max-w-[80%]">
                {item.title}
              </h3>
            </div>
            <div className="absolute bottom-0 right-0">
              <FontAwesomeIcon
                icon={
                  item.icon === "faGraduationCap"
                    ? faGraduationCap
                    : item.icon === "faUsers"
                    ? faUsers
                    : item.icon === "faBook"
                    ? faBook
                    : faLayerGroup
                }
                className="text-black/50 text-xl md:text-2xl p-4"
              />
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default function PictureLayout() {
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/picture-layout");
        if (!response.ok)
          throw new Error("Failed to fetch picture layout data");
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Lỗi từ API");
        setContentData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!contentData)
    return <div className="text-center py-12">Không có dữ liệu</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <MainFeature data={contentData.mainFeature} />
      <MembershipSection data={contentData.memberships} />
    </div>
  );
}
