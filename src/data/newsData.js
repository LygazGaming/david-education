const NEWS_DATA = [
  {
    id: 1,
    image: "/img2/img005.webp",
    title: "Trái bóng Molten Đi cùng VietGoal Cup 2024",
    excerpt: "Vượt qua 858km từ Sài Gòn sôi động tới thành phố biển Đà Nẵng, trái bóng Molten tiếp tục trở thành người bạn đồng hành...",
    date: "15/03/2024",
    views: "1.2k",
    featured: true,
    content: `
      <p>Chi tiết về trái bóng Molten và sự kiện VietGoal Cup 2024...</p>
      <p>Sự kiện này không chỉ là một giải đấu thể thao mà còn là một lễ hội văn hóa, nơi mà các cầu thủ và người hâm mộ có thể giao lưu và chia sẻ đam mê bóng đá.</p>
      <img src="/img2/img006.webp" alt="Trái bóng Molten 1" />
      <img src="/img2/img007.webp" alt="Trái bóng Molten 2" />
      <p>Trái bóng Molten đã được sử dụng trong nhiều giải đấu lớn và được các cầu thủ chuyên nghiệp đánh giá cao về chất lượng.</p>
      <img src="/img2/img008.webp" alt="Trái bóng Molten 3" />
      <p>Hãy cùng theo dõi những khoảnh khắc đáng nhớ trong giải đấu này, từ những bàn thắng đẹp mắt đến những pha cứu thua ngoạn mục.</p>
    `
  },
  {
    id: 2,
    image: "/img2/img055.webp",
    title: "Hành trình xin chữ ký Quang Hải",
    excerpt: "Tham gia sự kiện với các Công an Hà Nội FC...",
    date: "14/03/2024",
    views: "856",
    content: `
      <p>Chi tiết về hành trình xin chữ ký Quang Hải...</p>
      <p>Quang Hải, một trong những cầu thủ nổi tiếng nhất của bóng đá Việt Nam, đã có một buổi giao lưu tuyệt vời với người hâm mộ.</p>
      <img src="/img2/img058.webp" alt="Quang Hải 1" />
      <img src="/img2/img059.webp" alt="Quang Hải 2" />
      <p>Người hâm mộ đã có cơ hội gặp gỡ và xin chữ ký từ thần tượng của mình, tạo nên những kỷ niệm khó quên.</p>
    `
  },
  {
    id: 3,
    image: "/img2/img025.webp",
    title: "Giải đấu VietGoal Cup 2024 khu vực miền Bắc",
    excerpt: "Sự kiện được mong đợi nhất trong năm...",
    date: "13/03/2024",
    views: "945",
    content: `
      <p>Chi tiết về giải đấu VietGoal Cup 2024 khu vực miền Bắc...</p>
      <p>Giải đấu năm nay quy tụ nhiều đội bóng mạnh từ khắp nơi, hứa hẹn sẽ mang đến những trận đấu hấp dẫn.</p>
      <img src="/img2/img026.webp" alt="Giải đấu 1" />
      <img src="/img2/img027.webp" alt="Giải đấu 2" />
      <p>Các đội bóng sẽ cạnh tranh để giành lấy chiếc cúp danh giá và khẳng định vị thế của mình trong làng bóng đá Việt Nam.</p>
    `
  },
  {
    id: 4,
    image: "/img2/img088.webp",
    title: "Khoảnh khắc ấn tượng tại VietGoal Cup",
    excerpt: "Những hình ảnh đẹp nhất được ghi lại...",
    date: "12/03/2024",
    views: "723",
    content: `
      <p>Chi tiết về những khoảnh khắc ấn tượng tại VietGoal Cup...</p>
      <p>Giải đấu không chỉ là nơi để các cầu thủ thể hiện tài năng mà còn là nơi ghi lại những khoảnh khắc đáng nhớ.</p>
      <img src="/img2/img089.webp" alt="Khoảnh khắc 1" />
      <img src="/img2/img090.webp" alt="Khoảnh khắc 2" />
      <p>Từ những bàn thắng đẹp đến những giọt nước mắt của niềm vui và nỗi buồn, tất cả đều được ghi lại trong những bức ảnh tuyệt đẹp.</p>
    `
  },
  {
    id: 5,
    image: "/img2/img091.webp",
    title: "Cầu thủ trẻ triển vọng của bóng đá Việt Nam",
    excerpt: "Khám phá những tài năng trẻ đang nổi bật...",
    date: "11/03/2024",
    views: "1.1k",
    content: `
      <p>Những cầu thủ trẻ đang dần khẳng định mình trong làng bóng đá Việt Nam...</p>
      <p>Họ không chỉ có tài năng mà còn có sự nỗ lực và quyết tâm để vươn xa hơn.</p>
      <img src="/img2/img092.webp" alt="Cầu thủ trẻ 1" />
      <p>Hãy cùng theo dõi hành trình của họ trong các giải đấu sắp tới.</p>
    `
  },
  {
    id: 6,
    image: "/img2/img093.webp",
    title: "Sự kiện giao lưu bóng đá cộng đồng",
    excerpt: "Một ngày hội bóng đá cho mọi lứa tuổi...",
    date: "10/03/2024",
    views: "500",
    content: `
      <p>Sự kiện giao lưu bóng đá cộng đồng đã diễn ra thành công với sự tham gia của nhiều người hâm mộ...</p>
      <p>Đây là cơ hội để mọi người cùng nhau chơi bóng và giao lưu.</p>
      <img src="/img2/img094.webp" alt="Sự kiện 1" />
      <p>Hãy cùng nhìn lại những khoảnh khắc đáng nhớ trong sự kiện này.</p>
    `
  },
  {
    id: 7,
    image: "/img2/img095.webp",
    title: "Giải đấu bóng đá học sinh toàn quốc",
    excerpt: "Nơi tài năng trẻ được phát hiện...",
    date: "09/03/2024",
    views: "800",
    content: `
      <p>Giải đấu bóng đá học sinh toàn quốc đã thu hút sự chú ý của nhiều người hâm mộ...</p>
      <p>Các đội bóng từ khắp nơi đã tham gia và thể hiện tài năng của mình.</p>
      <img src="/img2/img096.webp" alt="Giải đấu học sinh 1" />
      <p>Hãy cùng chờ đón những tài năng trẻ trong tương lai.</p>
    `
  },
  {
    id: 8,
    image: "/img2/img097.webp",
    title: "Bóng đá nữ Việt Nam: Hành trình chinh phục",
    excerpt: "Những bước tiến vượt bậc của bóng đá nữ...",
    date: "08/03/2024",
    views: "600",
    content: `
      <p>Bóng đá nữ Việt Nam đang có những bước tiến vượt bậc trong thời gian gần đây...</p>
      <p>Họ đã có những thành công đáng kể trong các giải đấu quốc tế.</p>
      <img src="/img2/img098.webp" alt="Bóng đá nữ 1" />
      <p>Hãy cùng theo dõi hành trình của họ trong các giải đấu sắp tới.</p>
    `
  },
  {
    id: 9,
    image: "/img2/img099.webp",
    title: "Câu chuyện về những người hùng thầm lặng",
    excerpt: "Những người đã cống hiến cho bóng đá Việt Nam...",
    date: "07/03/2024",
    views: "400",
    content: `
      <p>Câu chuyện về những người hùng thầm lặng trong bóng đá Việt Nam...</p>
      <p>Họ là những người đã cống hiến hết mình cho sự phát triển của bóng đá nước nhà.</p>
      <img src="/img2/img100.webp" alt="Người hùng 1" />
      <p>Hãy cùng tôn vinh những đóng góp của họ.</p>
    `
  }
];

export default NEWS_DATA;