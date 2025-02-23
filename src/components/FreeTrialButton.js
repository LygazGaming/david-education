"use client";
import { useState } from "react";
import FreeTrialModal from "./FreeTrialModal";

const FreeTrialButton = ({ text = "Đăng Ký Tập Thử Miễn Phí" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={openModal}
          className="bg-secondary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-4px] font-bold text-sm md:text-base"
          aria-label="Mở form đăng ký tập thử miễn phí"
        >
          {text}
        </button>
      </div>
      <FreeTrialModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default FreeTrialButton;
