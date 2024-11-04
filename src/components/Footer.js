// components/Footer.js
"useEffect";
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary p-6 text-white flex flex-col md:flex-row items-start justify-between px-4 md:px-28">
      {/* Phần bên trái */}
      <div className="flex flex-col items-start space-y-2">
        <img src="/logo.png" alt="David Education Logo" className="h-24 mb-4" />
        <p className="text-sm text-opacity-90">&copy; {new Date().getFullYear()} David Education. All rights reserved.</p>
        <div className="flex space-x-3 mt-2"> 
          <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebook className="text-white h-5 w-5 hover:text-blue-800 transition-colors duration-300" />
          </Link>
          <Link href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
            <FaTiktok className="text-white h-5 w-5 hover:text-gray-800 transition-colors duration-300" />
          </Link>
          <Link href="https://www.youtube.com" target="_blank" aria-label="YouTube">
            <FaYoutube className="text-white h-5 w-5 hover:text-red-800 transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* Phần bên phải */}
      <div className="flex flex-col items-start space-y-6 mt-4 md:mt-0">
        <h2 className="text-xl font-bold">David Education</h2>
        <p className="text-base text-opacity-90">Địa chỉ: HUFLIT</p>
        <p className="text-base text-opacity-90">Hotline: 0123456789</p>
      </div>
    </footer>
  );
};

export default Footer;
