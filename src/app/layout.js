import Link from 'next/link';
import './globals.css';
import { FaFacebook, FaYoutube, FaTiktok, FaVolumeUp } from 'react-icons/fa';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>David Education</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Notification Bar */}
        <div className="bg-secondary p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 pl-[16rem]">
            <FaVolumeUp className="text-white h-6 w-6 ml-4" />
            <marquee className="text-white text-sm font-semibold tracking-wide" scrollamount="18">
              Tầm Vóc Việt Nam hân hạnh đồng hành cùng HTV trong chuỗi hoạt động Trung thu 2024, mang đến cho các em nhỏ một mùa lễ tràn đầy yêu thương, vui khỏe và đầy sắc màu. Với thông điệp “yêu thương cho đi là yêu thương còn mãi”, học viện luôn nỗ lực.
            </marquee>
          </div>
          <div className="flex items-center space-x-4 pr-[16rem]">
            <Link href="https://www.facebook.com" target="_blank">
              <div className="bg-blue-600 p-1 rounded-full hover:bg-blue-800 transition duration-300 flex items-center justify-center ml-4">
                <FaFacebook className="text-white h-6 w-6" />
              </div>
            </Link>
            <Link href="https://www.tiktok.com" target="_blank">
              <div className="bg-black p-1 rounded-full hover:bg-gray-800 transition duration-300 flex items-center justify-center ml-4">
                <FaTiktok className="text-white h-6 w-6" />
              </div>
            </Link>
            <Link href="https://www.youtube.com" target="_blank">
              <div className="bg-red-600 p-1 rounded-full hover:bg-red-800 transition duration-300 flex items-center justify-center ml-4">
                <FaYoutube className="text-white h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>

        <header className="bg-primary p-2 pl-[16rem] flex items-center justify-between">
          <div className="flex items-center bg-white h-full p-2 pr-4 ml-4"> 
            <img src="/logo.png" alt="David Education Logo" className="h-10 mr-2" />
            <h1 className="text-[#f48420] text-2xl font-bold">David <span className="text-[#4579bc]">Education</span></h1>
          </div>
          <nav className="flex-grow pl-1"> 
            <ul className="flex justify-center space-x-24">
              <li><Link href="/" className="text-white font-bold hover:text-secondary">TRANG CHỦ</Link></li>
              <li><Link href="/news" className="text-white font-bold hover:text-secondary">TIN TỨC</Link></li>
              <li><Link href="/training-packages" className="text-white font-bold hover:text-secondary">CÁC GÓI TẬP</Link></li>
              <li><Link href="/photo-album" className="text-white font-bold hover:text-secondary">ALBUM ẢNH</Link></li>
              <li><Link href="/training-videos" className="text-white font-bold hover:text-secondary">VIDEO HUẤN LUYỆN</Link></li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>
<footer className="bg-primary p-4 text-white flex items-start px-[30rem]">
  {/* Phần bên trái */}
  <div className="flex flex-col items-start space-y-2 mr-28">
    <img src="/logo.png" alt="David Education Logo" className="h-24 mb-4" />
    <p className="text-sm text-opacity-90">&copy; {new Date().getFullYear()} David Education. All rights reserved.</p>
    <div className="flex space-x-3 mt-2"> 
      <Link href="https://www.facebook.com" target="_blank">
        <FaFacebook className="text-white h-5 w-5 hover:text-blue-800" />
      </Link>
      <Link href="https://www.tiktok.com" target="_blank">
        <FaTiktok className="text-white h-5 w-5 hover:text-gray-800" />
      </Link>
      <Link href="https://www.youtube.com" target="_blank">
        <FaYoutube className="text-white h-5 w-5 hover:text-red-800" />
      </Link>
    </div>
  </div>

  {/* Phần bên phải */}
  <div className="flex flex-col items-start space-y-6">
    <h2 className="text-xl font-bold">David Education</h2>
    <p className="text-base text-opacity-90 mt-4">Địa chỉ: HUFLIT</p>
    <p className="text-base text-opacity-90 mt-4">Hotline: 0123456789</p>
  </div>
</footer>
{/* Nút Đăng Ký Tập Thử Miễn Phí */}
<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
  <Link 
    href="/register" 
    className="bg-secondary text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#ff9500] transition duration-300 hover:shadow-xl" // Thay đổi màu nền khi hover và thêm bóng đổ
  >
    Đăng Ký Tập Thử Miễn Phí
  </Link>
</div>




      </body>
    </html>
  );
}
