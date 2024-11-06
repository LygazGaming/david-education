  {/* Phần mới cho Tin tức */}
// components/TinTuc.js
const TinTuc = () => {
  return (
  <div className="news-section p-4">
    <h2 className="text-left text-2xl font-bold">Tin tức</h2>
    <hr className="border-t border-gray-300 my-2" />
    <div className="flex justify-between items-center">
      <button className="bg-white text-black px-4 py-2 flex items-center">
        <span>Xem tất cả</span>
        <i className="ml-2 fas fa-arrow-right"></i> {/* Biểu tượng cho "Xem tất cả" */}
      </button>
    </div>
    
    <div className="flex mt-4">
      <img src="/images/news-image.jpg" alt="Tin tức" className="w-1/2 h-auto object-cover" />
      <div className="news-content w-1/2 pl-4">
        <h3 className="text-xl font-semibold">Tiêu đề tin tức</h3>
        <p className="mt-2">Nội dung tin tức sẽ được hiển thị ở đây. Đây là một mô tả ngắn gọn về tin tức.</p>
        <button className="bg-white text-black px-4 py-2 flex items-center mt-2">
          <span>Xem tất cả</span>
          <i className="ml-2 fas fa-arrow-right"></i> {/* Biểu tượng cho "Xem tất cả" */}
        </button>
      </div>
    </div>

    {/* Slider cho các mục tin tức bổ sung */}
    <div className="additional-news-slider mt-6">
      <Slider {...settings}>
        <div className="news-item">
          <img src="/images/news1.jpg" alt="Tin tức 1" className="w-full h-auto object-cover" />
          <h4 className="text-lg font-semibold">Tin tức 1</h4>
          <p>Mô tả ngắn về tin tức 1.</p>
        </div>
        <div className="news-item">
          <img src="/images/news2.jpg" alt="Tin tức 2" className="w-full h-auto object-cover" />
          <h4 className="text-lg font-semibold">Tin tức 2</h4>
          <p>Mô tả ngắn về tin tức 2.</p>
        </div>
        <div className="news-item">
          <img src="/images/news3.jpg" alt="Tin tức 3" className="w-full h-auto object-cover" />
          <h4 className="text-lg font-semibold">Tin tức 3</h4>
          <p>Mô tả ngắn về tin tức 3.</p>
        </div>
      </Slider>
    </div>
  </div>
  )
}