// components/FreeTrialModal.js
"use client";

const FreeTrialModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-md md:max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-12 right-4 text-black text-3xl font-bold z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="hidden md:flex w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <img
            src="/img2/img045.webp"
            alt="Trial"
            className="object-cover w-full h-48 md:h-full rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-6">
          <img
            src="/logo.png"
            alt="David Education Logo"
            className="h-10 md:h-12 mb-4"
          />
          <h2 className="text-lg md:text-xl font-bold text-[#4579bc] mb-2">
            Đăng Ký Tập Thử Miễn Phí
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Mời phụ huynh điền thông tin đăng ký dưới đây
          </p>
          <form className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Họ và tên học viên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập tên học viên"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Ngày tháng năm sinh (không bắt buộc)
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Họ và tên phụ huynh (không bắt buộc)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập tên phụ huynh"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Số điện thoại phụ huynh <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Email (không bắt buộc)
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Ca học thử <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập ca học thử"
                required
              />
            </div>

            <button
              type="button"
              className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-opacity-90 transition"
              onClick={onClose}
            >
              Yêu Cầu Tư Vấn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialModal;
