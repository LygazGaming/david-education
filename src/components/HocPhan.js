import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import FreeTrialModal from "./FreeTrialModal";

const courses = [
  {
    title: "HỌC PHẦN 4 THÁNG",
    price: "4.800.00đ",
    isPopular: false,
    features: [
      "48 buổi tập lớp tiêu chuẩn ngày thường hoặc 32 buổi tập lớp cuối tuần thứ 7/ CN",
      "Tham gia sự kiện và thi đấu giải",
      "4 buổi bảo lưu",
      "Tặng 1 áo đồng phục học viện",
      "Tặng 1 vợt cầu lông Kumpoo K520 trị giá 550.00đ",
    ],
  },
  {
    title: "HỌC PHẦN 9 THÁNG",
    price: "10.800.00đ",
    isPopular: true,
    features: [
      "108 buổi tập lớp tiêu chuẩn ngày thường hoặc 72 buổi tập lớp cuối tuần thứ 7/ CN",
      "Tham gia sự kiện và thi đấu giải",
      "9 buổi bảo lưu",
      "Tặng 2 áo đồng phục học viện",
      "Tặng 1 vợt cầu lông VS Hằng Nga trị giá 900.000đ",
    ],
  },
  {
    title: "HỌC PHẦN 12 THÁNG",
    price: "14.400.00đ",
    isPopular: false,
    features: [
      "144 buổi tập lớp tiêu chuẩn ngày thường hoặc 96 buổi tập lớp cuối tuần thứ 7/ CN",
      "Tham gia sự kiện và thi đấu giải",
      "12 buổi bảo lưu",
      "Tặng 2 áo đồng phục học viện",
      "Tặng 1 vợt cầu lông VS Yulong trị giá 1.200.000đ",
    ],
  },
];

const HocPhan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          {courses.map((course, index) => (
            <div
              key={index}
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
                      {" "}
                      {/* Thay đổi items-center thành items-start */}
                      <FaCheck
                        className={`text-base mt-1 flex-shrink-0 ${
                          course.isPopular ? "text-yellow-300" : "text-primary"
                        }`}
                      />
                      {/* Thêm text-base, mt-1, và flex-shrink-0 */}
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
                  {" "}
                  {/* Đảm bảo nút bấm luôn ở dưới cùng */}
                  <button
                    onClick={openModal}
                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                      course.isPopular
                        ? "bg-white text-primary hover:bg-gray-100"
                        : "bg-primary text-white hover:opacity-90"
                    }`}
                  >
                    Đăng Ký Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <FreeTrialModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HocPhan;
