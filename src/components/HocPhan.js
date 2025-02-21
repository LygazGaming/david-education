import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import FreeTrialModal from "./FreeTrialModal";

const HocPhan = () => {
  const [courses, setCourses] = useState([]); // Khởi tạo là mảng rỗng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(null); // State để lưu lỗi

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/courses");

        // Kiểm tra phản hồi từ API
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ API");
        }

        const data = await response.json();
        // Đảm bảo data là một mảng
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        setError(error.message); // Lưu thông báo lỗi
        setCourses([]); // Set mảng rỗng nếu có lỗi
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitForm = async (formData) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi dữ liệu");
      }

      const result = await response.json();
      console.log("Dữ liệu đã được gửi thành công:", result);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500">Lỗi: {error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Chọn Học Phần Phù Hợp</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp nhiều lựa chọn học phần khác nhau để phù hợp với
            nhu cầu và mục tiêu của bạn.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.isArray(courses) &&
            courses.map((course) => (
              <div
                key={course._id}
                className={`relative rounded-xl flex flex-col h-full ${
                  course.isPopular ? "bg-primary" : "bg-white"
                } shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1`}
              >
                {course.isPopular && (
                  <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      course.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {course.title}
                  </h3>

                  <div className="mb-6">
                    <span
                      className={`text-3xl font-bold ${
                        course.isPopular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {course.price}
                    </span>
                    <span
                      className={`text-sm ${
                        course.isPopular ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      /khóa học
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheck
                          className={`text-base mt-1 flex-shrink-0 ${
                            course.isPopular
                              ? "text-yellow-300"
                              : "text-primary"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            course.isPopular ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button
                      onClick={() =>
                        submitForm({
                          /* thông tin cần gửi */
                        })
                      }
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                        course.isPopular
                          ? "bg-white text-primary hover:bg-gray-100"
                          : "bg-primary text-white hover:opacity-90"
                      }`}
                    >
                      Đăng kí ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <FreeTrialModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HocPhan;
