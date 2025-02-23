// components/HocPhan.js
"use client";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import FreeTrialModal from "./FreeTrialModal";

const HocPhan = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/courses");
        if (!response.ok) throw new Error("Không thể lấy dữ liệu từ API");
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        setError(error.message);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const submitForm = (formData) => {
    alert(
      `Đăng ký ${
        selectedCourse ? "học phần" : "tập thử"
      } thành công! Chúng tôi sẽ liên hệ sớm.`
    );
    closeModal(); // Đóng modal sau khi gửi thành công
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">Lỗi: {error}</div>;

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
          {courses.map((course) => (
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
                          course.isPopular ? "text-yellow-300" : "text-primary"
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
                    onClick={() => openModal(course)}
                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                      course.isPopular
                        ? "bg-white text-primary hover:bg-gray-100"
                        : "bg-primary text-white hover:opacity-90"
                    }`}
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FreeTrialModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={submitForm}
        selectedCourse={selectedCourse}
      />
    </div>
  );
};

export default HocPhan;
