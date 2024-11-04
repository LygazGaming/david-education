import { FaFacebook, FaYoutube, FaTiktok, FaVolumeUp } from 'react-icons/fa';
import Link from 'next/link';

const NotificationBar = () => {
  return (
    <div className="bg-secondary p-4 px-8 pl-[16rem] flex items-center justify-between">
      <div className="flex items-center space-x-2 flex-1">
        <FaVolumeUp className="text-white h-6 w-6 ml-4" aria-hidden="true" />
        <marquee className="text-white text-sm font-semibold tracking-wide" scrollamount="10">
          Tầm Vóc Việt Nam hân hạnh đồng hành cùng HTV trong chuỗi hoạt động Trung thu 2024, mang đến cho các em nhỏ một mùa lễ tràn đầy yêu thương, vui khỏe và đầy sắc màu. Với thông điệp “yêu thương cho đi là yêu thương còn mãi”, học viện luôn nỗ lực.
        </marquee>
      </div>
      <div className="flex items-center space-x-4 pr-4">
        <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <div className="bg-blue-600 p-2 rounded-full hover:bg-blue-800 transition duration-300 flex items-center justify-center">
            <FaFacebook className="text-white h-5 w-5" />
          </div>
        </Link>
        <Link href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
          <div className="bg-black p-2 rounded-full hover:bg-gray-800 transition duration-300 flex items-center justify-center">
            <FaTiktok className="text-white h-5 w-5" />
          </div>
        </Link>
        <Link href="https://www.youtube.com" target="_blank" aria-label="YouTube">
          <div className="bg-red-600 p-2 rounded-full hover:bg-red-800 transition duration-300 flex items-center justify-center">
            <FaYoutube className="text-white h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotificationBar;
