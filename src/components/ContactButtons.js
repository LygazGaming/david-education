"use client";
import { BsTelephoneFill } from 'react-icons/bs';
import { SiZalo } from 'react-icons/si';
import { FaFacebookMessenger } from 'react-icons/fa';


const ContactButtons = () => {
    return (
      <div className="fixed right-5 bottom-5 flex flex-col gap-3 z-50">
        <a
          href="tel:+84123456789"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
        >
          <BsTelephoneFill size={24} />
        </a>
        <a
          href="https://zalo.me/0905353230"
          className="w-14 h-14 bg-[#0068ff] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
        >
          <SiZalo size={28} />
        </a>
        <a
          href="https://m.me/LongSeaGamer"
          className="w-14 h-14 bg-[#0099FF] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
        >
          <FaFacebookMessenger size={28} />
        </a>
      </div>
    );
};
  
  export default ContactButtons;