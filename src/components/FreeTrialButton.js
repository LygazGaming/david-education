// components/FreeTrialButton.js
"use client";
import { useState } from 'react';
import FreeTrialModal from './FreeTrialModal';

const FreeTrialButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button 
        onClick={openModal}
        className="bg-secondary text-white px-8 py-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-4px] font-bold"
      >
        Đăng Ký Tập Thử Miễn Phí
      </button>
      
      {/* Modal Component */}

    </div>
    <FreeTrialModal isOpen={isModalOpen} onClose={closeModal} />
    </div>

  );
};

export default FreeTrialButton;
