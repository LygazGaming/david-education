import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faUsers, faBook, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';


const MainFeature = () => (
  <div className="relative w-full h-[500px]">
    <img
      src={CONTENT_DATA.mainFeature.image}
      alt=""
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 w-1/2 bg-black/70 p-6">
      <p className="text-white text-lg">{CONTENT_DATA.mainFeature.title}</p>
      <span className={`${CONTENT_DATA.mainFeature.icon} text-white mt-2`}></span>
    </div>
  </div>
);

const MembershipSection = () => (
  <div className="grid grid-cols-2 gap-0">
    {CONTENT_DATA.memberships.map((item, index) => (
      <div key={index} className={`${item.bgColor} text-center aspect-square relative`}>  {/* Thay đổi height cố định thành aspect-square */}
        {item.title ? (
          <>
            <div className="p-4 h-full flex items-center justify-center">
              <h3 className="text-white text-xs md:text-base font-normal">
                {item.title}
              </h3>
            </div>
            <div className="absolute bottom-0 right-0">
              <FontAwesomeIcon 
                icon={item.icon} 
                className="text-black/50 text-xl p-4"
              />
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
          <Image 
            src={item.image}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
        )}
      </div>
    ))}
  </div>
);
const CONTENT_DATA = {
  mainFeature: {
    image: "/images/home/1.jpg",
    title: "Trung tâm đào tạo cầu lông dành cho em trẻ",
    icon: "icon-class"
  },
  memberships: [
    {
      title: "Mô Hình Mindful Badminton - Huấn Luyện Cầu Lông, Đào Luyện Nhân Cách",
      bgColor: "bg-[#e67012]",
      icon: faGraduationCap
    },
    {
      image: "/images/home/2.jpg",
      bgColor: "bg-[#f48420]"
    },
    {
      image: "/images/home/3.jpg",
      bgColor: "bg-[#f48420]"
    },
    {
      title: "Đội ngũ HLV giàu kinh nghiệm, tận tâm với nghề",
      bgColor: "bg-[#e67012]",
      icon: faUsers
    },
    {
      title: "Giáo án bài bản, cá nhân hoá và đặc biệt lòng ghép các bài học ý nghĩa thông qua các bài tập",
      bgColor: "bg-[#f48420]",
      icon: faBook
    },
    {
      image: "/images/home/4.jpg",
      bgColor: "bg-[#e67012]"
    },
    {
      image: "/images/home/5.jpg",
      bgColor: "bg-[#f48420]"
    },
    {
      title: "Các lớp học đà dạng từ cơ bản, nâng cao, năng khiếu",
      bgColor: "bg-[#e67012]",
      icon: faLayerGroup
    }
  ]
};

export default function PictureLayout() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <MainFeature />
      <MembershipSection />
    </div>
  );
}