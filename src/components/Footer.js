import Link from 'next/link';
import { FaFacebook, FaYoutube, FaTiktok, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <img 
              src="/logo.png" 
              alt="David Education Logo" 
              className="h-16 object-contain"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Chúng tôi cam kết mang đến những trải nghiệm tốt nhất cho học viên với đội ngũ huấn luyện viên chuyên nghiệp và cơ sở vật chất hiện đại.
            </p>
            <div className="flex space-x-5">
              <Link href="https://www.facebook.com" target="_blank" 
                    className="bg-white/10 p-2.5 rounded-lg hover:-translate-y-1 hover:bg-white/20 transition-all duration-300">
                <FaFacebook className="w-5 h-5 text-white" />
              </Link>
              <Link href="https://www.tiktok.com" target="_blank"
                    className="bg-white/10 p-2.5 rounded-lg hover:-translate-y-1 hover:bg-white/20 transition-all duration-300">
                <FaTiktok className="w-5 h-5 text-white" />
              </Link>
              <Link href="https://www.youtube.com" target="_blank"
                    className="bg-white/10 p-2.5 rounded-lg hover:-translate-y-1 hover:bg-white/20 transition-all duration-300">
                <FaYoutube className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Liên Kết Nhanh</h3>
            <ul className="space-y-4">
              {['Trang chủ', 'Tin tức', 'Các gói tập', 'Album ảnh', 'Video huấn luyện'].map((item) => (
                <li key={item}>
                  <Link href="#" 
                        className="text-white/80 hover:text-white group flex items-center">
                    <FaArrowRight className="w-4 h-4 mr-2 transform transition-transform group-hover:translate-x-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Thông Tin Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-white/60 mt-1 flex-shrink-0" />
                <span className="text-white/80">TP.HCM</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-white/80">0123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-white/80">info@davideducation.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Giờ Hoạt Động</h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-white/80 pb-2 border-b border-white/10">
                <span>Thứ 2 - Thứ 6:</span>
                <span>7:00 - 21:00</span>
              </li>
              <li className="flex justify-between text-white/80 pb-2 border-b border-white/10">
                <span>Thứ 7:</span>
                <span>7:00 - 18:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Chủ nhật:</span>
                <span>8:00 - 16:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} David Education. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;