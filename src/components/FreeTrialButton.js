// components/FreeTrialButton.js
"useEffect";
import Link from 'next/link';

const FreeTrialButton = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Link 
        href="" 
        className="bg-secondary text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#ff9500] transition duration-300 hover:shadow-xl"
      >
        Đăng Ký Tập Thử Miễn Phí
      </Link>
    </div>
  );
};

export default FreeTrialButton;
