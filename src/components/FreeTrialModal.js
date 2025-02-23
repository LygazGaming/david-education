// components/FreeTrialModal.js
"use client";
import { useState } from "react";

const FreeTrialModal = ({ isOpen, onClose, onSubmit, selectedCourse }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    birthDate: "",
    parentName: "",
    phone: "",
    email: "",
    trialSession: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validation
      if (!formData.studentName || !formData.phone) {
        throw new Error(
          "Vui lòng điền đầy đủ họ tên học viên và số điện thoại"
        );
      }
      if (!selectedCourse && !formData.trialSession) {
        throw new Error("Vui lòng điền ca học thử nếu không chọn học phần");
      }

      const payload = {
        ...formData,
        type: selectedCourse ? "course" : "trial",
        courseId: selectedCourse?._id,
        courseTitle: selectedCourse?.title,
      };

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Đã có lỗi xảy ra");
      }

      onSubmit(payload); // Gọi hàm submit từ parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={
        selectedCourse ? "Đăng ký học phần" : "Đăng ký tập thử miễn phí"
      }
    >
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-md md:max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-3xl font-bold z-10"
          aria-label="Đóng modal"
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
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center mb-6 md:mb-0">
          <img
            src="/img2/img045.webp"
            alt="Học viên tập thử"
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
            {selectedCourse
              ? `Đăng Ký Học Phần: ${selectedCourse.title}`
              : "Đăng Ký Tập Thử Miễn Phí"}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Vui lòng điền thông tin đăng ký dưới đây
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Họ và tên học viên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập tên học viên"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Ngày tháng năm sinh
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Họ và tên phụ huynh
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                placeholder="Nhập email"
              />
            </div>
            {!selectedCourse && (
              <div>
                <label className="block text-gray-700 text-sm md:text-base font-semibold">
                  Ca học thử <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="trialSession"
                  value={formData.trialSession}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 md:p-3 rounded-lg text-base md:text-lg mt-1"
                  placeholder="Nhập ca học thử"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400"
            >
              {loading
                ? "Đang gửi..."
                : selectedCourse
                ? "Đăng Ký Học Phần"
                : "Yêu Cầu Tư Vấn"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialModal;
