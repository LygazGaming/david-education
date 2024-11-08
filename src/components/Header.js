// app/components/Header.js
"use client";
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary p-2 px-4 md:px-[6rem] flex items-center justify-between relative z-50"> {/* Đặt z-50 để header luôn trên cùng */}
      <div className="flex items-center">
        <div className="flex items-center bg-white h-full p-2 pr-4 rounded-lg">
          <img src="/logo.png" alt="David Education Logo" className="h-8 md:h-10 mr-2" />
          <h1 className="text-[#f48420] text-xl md:text-2xl font-bold">David <span className="text-[#4579bc]">Education</span></h1>
        </div>
        <nav className="hidden md:block ml-8">
          <ul className="flex space-x-4 lg:space-x-24">
            <li><Link href="/" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Trang chủ">TRANG CHỦ</Link></li>
            <li><Link href="/news" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Tin tức">TIN TỨC</Link></li>
            <li><Link href="/training-packages" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Các gói tập">CÁC GÓI TẬP</Link></li>
            <li><Link href="/photo-album" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Album ảnh">ALBUM ẢNH</Link></li>
            <li><Link href="/training-videos" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Video huấn luyện">VIDEO HUẤN LUYỆN</Link></li>
          </ul>
        </nav>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <div className={`absolute top-full left-0 right-0 bg-primary md:hidden transition-transform duration-300 ${isOpen ? 'block' : 'hidden'} z-50`}>
        <ul className="flex flex-col items-center py-4">
          <li className="my-2"><Link href="/" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Trang chủ">TRANG CHỦ</Link></li>
          <li className="my-2"><Link href="/news" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Tin tức">TIN TỨC</Link></li>
          <li className="my-2"><Link href="/training-packages" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Các gói tập">CÁC GÓI TẬP</Link></li>
          <li className="my-2"><Link href="/photo-album" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Album ảnh">ALBUM ẢNH</Link></li>
          <li className="my-2"><Link href="/training-videos" className="text-white font-bold hover:text-secondary transition duration-300" aria-label="Video huấn luyện">VIDEO HUẤN LUYỆN</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
