"use client";
import { FaFacebook, FaYoutube, FaTiktok, FaVolumeUp } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

const SocialIcon = ({ href, icon: Icon, bgColor, hoverColor, label }) => (
  <Link href={href} target="_blank" aria-label={label}>
    <div
      className={`${bgColor} p-1.5 rounded-full ${hoverColor} transition-all duration-300 
      transform hover:scale-110 flex items-center justify-center shadow-sm`}
    >
      <Icon className="text-white h-3.5 w-3.5 md:h-4 md:w-4" />
    </div>
  </Link>
);

const NotificationBar = () => {
  const [announcementText, setAnnouncementText] = useState(
    "Đang tải thông báo..."
  );

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        if (data.success && data.data) {
          setAnnouncementText(data.data.text);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông báo:", error);
        setAnnouncementText("Không thể tải thông báo");
      }
    };

    fetchNotification();
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com",
      icon: FaFacebook,
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      label: "Facebook",
    },
    {
      href: "https://www.tiktok.com",
      icon: FaTiktok,
      bgColor: "bg-black",
      hoverColor: "hover:bg-gray-800",
      label: "TikTok",
    },
    {
      href: "https://www.youtube.com",
      icon: FaYoutube,
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      label: "YouTube",
    },
  ];

  const getDisplayText = (text) => {
    if (text.length < 100) {
      return Array(3).fill(text).join(" • ");
    }
    return text;
  };
  return (
    <div className="bg-secondary py-2 px-4 md:px-24 shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-3 flex-1">
          <div className="animate-pulse">
            <FaVolumeUp
              className="text-white h-4 w-4 md:h-5 md:w-5"
              aria-hidden="true"
            />
          </div>
          <div className="overflow-hidden">
            <marquee
              className="text-white text-xs md:text-sm font-semibold tracking-wide"
              scrollamount="8"
            >
              {getDisplayText(announcementText)}
            </marquee>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default NotificationBar;
