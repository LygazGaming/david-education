import PricingCard from "./PricingCard";

export default function HocPhan() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl"> 
        {/* Sử dụng gap-12 để tăng khoảng cách giữa các thẻ */}
        <PricingCard
          title="HỌC PHẦN 04 THÁNG"
          buttonColor="bg-secondary hover:bg-blue-700"
          bgColor="bg-blue-500"
          cardClass="scale-125" 
        />
        <PricingCard
          title="HỌC PHẦN 06 THÁNG"
          buttonColor="bg-primary hover:bg-orange-600"
          bgColor="bg-orange-400"
          cardClass="scale-125" 
        />
        <PricingCard
          title="HỌC PHẦN 08 THÁNG"
          buttonColor="bg-secondary hover:bg-blue-700"
          bgColor="bg-blue-500"
          cardClass="scale-125"
        />
      </div>
    </div>
  );
}
