"use client";
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary p-2 pl-4 md:pl-[16rem] flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center bg-white h-full p-2 pr-4"> 
        <img src="/logo.png" alt="David Education Logo" className="h-10 mr-2" />
        <h1 className="text-[#f48420] text-2xl font-bold">David <span className="text-[#4579bc]">Education</span></h1>
      </div>
      <nav className={`flex-grow pl-1 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-24 mt-4 md:mt-0"> {/* Thêm mt-4 để tạo khoảng cách */}
          <li><Link href="/" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Trang chủ">TRANG CHỦ</Link></li>
          <li><Link href="/news" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Tin tức">TIN TỨC</Link></li>
          <li><Link href="/training-packages" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Các gói tập">CÁC GÓI TẬP</Link></li>
          <li><Link href="/photo-album" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Album ảnh">ALBUM ẢNH</Link></li>
          <li><Link href="/training-videos" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Video huấn luyện">VIDEO HUẤN LUYỆN</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
