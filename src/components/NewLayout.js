// components/NewLayout.js
import React from 'react';

const NewLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hàng 1: 2 ảnh lớn */}
      <div className="flex mb-8">
        <div className="w-1/2 pr-4">
          <img src="/img/img001.jpg" alt="Large 1" className="w-full h-auto" />
        </div>
        <div className="w-1/2 pl-4">
          <img src="/img/img100.jpg" alt="Large 2" className="w-full h-auto" />
        </div>
      </div>

      {/* Hàng 2: Ảnh nhỏ + Text + Ảnh */}
      <div className="flex mb-8">
        <div className="w-1/3 pr-4">
          <img src="/img/img003.jpg" alt="Small 1" className="w-full h-auto" />
        </div>
        <div className="w-1/3 px-4 bg-primary flex items-center justify-center">
          <p className="text-center">Đoạn text 1</p>
        </div>
        <div className="w-1/3 pl-4">
          <img src="/img/img004.jpg" alt="Medium 1" className="w-full h-auto" />
        </div>
      </div>

      {/* Hàng 3: Text + Ảnh nhỏ + Text */}
      <div className="flex">
        <div className="w-1/3 pr-4 bg-primary flex items-center justify-center">
          <p className="text-center">Đoạn text 2</p>
        </div>
        <div className="w-1/3 px-4">
          <img src="/img/img140.jpg" alt="Small 2" className="w-full h-auto" />
        </div>
        <div className="w-1/3 pl-4 bg-primary flex items-center justify-center">
          <p className="text-center">Đoạn text 3</p>
        </div>
      </div>
    </div>
  );
};

export default NewLayout;