"use client";
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary p-3 px-4 md:px-[6rem] flex items-center justify-between relative z-50 shadow-lg">
      <div className="flex items-center">
        <div className="flex items-center bg-white h-full p-2 pr-4 rounded-lg hover:shadow-md transition-all duration-300">
          <img src="/logo.png" alt="David Education Logo" className="h-8 md:h-10 mr-2 transform hover:scale-105 transition-transform duration-300" />
          <h1 className="text-[#f48420] text-xl md:text-2xl font-bold tracking-wide">David <span className="text-[#4579bc]">Education</span></h1>
        </div>
        <nav className="hidden md:block ml-8">
          <ul className="flex space-x-4 lg:space-x-24">
            <li>
              <Link 
                href="/" 
                className="text-white font-bold hover:text-secondary transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full" 
                aria-label="Trang chủ"
              >
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className="text-white font-bold hover:text-secondary transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full" 
                aria-label="Tin tức"
              >
                TIN TỨC
              </Link>
            </li>
            <li>
              <Link 
                href="/training-packages" 
                className="text-white font-bold hover:text-secondary transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full" 
                aria-label="Các gói tập"
              >
                CÁC GÓI TẬP
              </Link>
            </li>
            <li>
              <Link 
                href="/photo-album" 
                className="text-white font-bold hover:text-secondary transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full" 
                aria-label="Album ảnh"
              >
                ALBUM ẢNH
              </Link>
            </li>
            <li>
              <Link 
                href="/training-videos" 
                className="text-white font-bold hover:text-secondary transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full" 
                aria-label="Video huấn luyện"
              >
                VIDEO HUẤN LUYỆN
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={toggleMenu} 
          className="text-white focus:outline-none hover:text-secondary transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`absolute top-full left-0 right-0 bg-primary md:hidden transform transition-all duration-300 shadow-lg ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
        }`} // Đã loại bỏ rounded-lg
      >
        <ul className="flex flex-col items-center py-4">
          <li className="my-2 w-full text-center transition-transform duration-300 transform hover:scale-105">
            <Link 
              href="/" 
              className="text-white font-bold hover:text-secondary transition-all duration-300 block py-2 hover:bg-primary-dark" 
              aria-label="Trang chủ"
            >
              TRANG CHỦ
            </Link>
          </li>
          <li className="my-2 w-full text-center transition-transform duration-300 transform hover:scale-105">
            <Link 
              href="/news" 
              className="text-white font-bold hover:text-secondary transition-all duration-300 block py-2 hover:bg-primary-dark" 
              aria-label="Tin tức"
            >
              TIN TỨC
            </Link>
          </li>
          <li className="my-2 w-full text-center transition-transform duration-300 transform hover:scale-105">
            <Link 
              href="/training-packages" 
              className="text-white font-bold hover:text-secondary transition-all duration-300 block py-2 hover:bg-primary-dark" 
              aria-label="Các gói tập"
            >
              CÁC GÓI TẬP
            </Link>
          </li>
          <li className="my-2 w-full text-center transition-transform duration-300 transform hover:scale-105">
            <Link 
              href="/photo-album" 
              className="text-white font-bold hover:text-secondary transition-all duration-300 block py-2 hover:bg-primary-dark" 
              aria-label="Album ảnh"
            >
              ALBUM ẢNH
            </Link>
          </li>
          <li className="my-2 w-full text-center transition-transform duration-300 transform hover:scale-105">
            <Link 
              href="/training-videos" 
              className="text-white font-bold hover:text-secondary transition-all duration-300 block py-2 hover:bg-primary-dark" 
              aria-label="Video huấn luyện"
            >
              VIDEO HUẤN LUYỆN
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;