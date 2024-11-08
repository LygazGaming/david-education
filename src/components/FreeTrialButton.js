// components/FreeTrialButton.js
"use client";
import Link from 'next/link';

const FreeTrialButton = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Link 
        href="" 
        className="bg-secondary text-white px-8 py-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-4px] flex items-center justify-center"
      >
        <span className="transition duration-300 transform hover:translate-y-[-2px] font-bold">
          Đăng Ký Tập Thử Miễn Phí
        </span>
      </Link>
    </div>
  );
};

export default FreeTrialButton;