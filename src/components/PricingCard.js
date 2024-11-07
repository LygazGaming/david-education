export default function PricingCard({ title, buttonColor, bgColor, cardClass }) {
    return (
      <div className={`border rounded-lg p-12 ${bgColor} ${cardClass}`}>
        {/* Increased padding from p-8 to p-12 for more space */}
        <h2 className="text-center text-4xl font-bold text-white mb-10"> 
          {/* Increased font size to text-4xl */}
          {title}
        </h2>
        <ul className="mb-12 text-gray-200 text-lg">
          {/* Increased text size to text-lg */}
          <li className="flex items-center space-x-3 mb-6">
            <span className="text-blue-500">✔</span>
            <span>Tham gia sự kiện thi đấu và thi đấu giải</span>
          </li>
          <li className="flex items-center space-x-3 mb-6">
            <span className="text-blue-500">✔</span>
            <span>Tham gia sự kiện thi đấu và thi đấu giải</span>
          </li>
          <li className="flex items-center space-x-3 mb-6">
            <span className="text-blue-500">✔</span>
            <span>Tham gia sự kiện thi đấu và thi đấu giải</span>
          </li>
        </ul>
        <button
          className={`w-full py-4 text-xl text-white font-bold rounded ${buttonColor}`}
        >
          {/* Increased button padding and font size */}
          Đăng Ký Ngay
        </button>
      </div>
    );
  }
  