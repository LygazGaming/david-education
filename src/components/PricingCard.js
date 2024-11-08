export default function PricingCard({ title, price, features, isPopular }) {
  return (
    <div className={`relative rounded-2xl p-8 ${
      isPopular 
        ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl transform hover:-translate-y-1' 
        : 'bg-white hover:bg-gray-50'
    } transition-all duration-300 hover:shadow-lg`}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 
                        text-sm font-semibold px-4 py-1 rounded-full shadow-md">
          Phổ biến nhất
        </span>
      )}

      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <div className={`text-4xl font-bold mb-6 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
          {price}
          <span className={`text-base font-normal ${isPopular ? 'text-gray-200' : 'text-gray-500'}`}>
            /tháng
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <svg className={`w-5 h-5 ${isPopular ? 'text-green-300' : 'text-green-500'}`} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M5 13l4 4L19 7"></path>
            </svg>
            <span className={`${isPopular ? 'text-gray-100' : 'text-gray-600'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200 ${
        isPopular
          ? 'bg-white text-blue-600 hover:bg-gray-100'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Đăng Ký Ngay
      </button>
    </div>
  );
}