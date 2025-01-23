import React from "react";
import BestSellerContent from "./components/best-seller-content";
import BestSellerCarousel from "./components/best-seller-carousel";

export default function BestSellerComponent() {
  return (
    <div className="best-seller w-[1279px] flex justify-between items-center mb-20">
      {/* Left Section: About Best Sellers */}
      <BestSellerContent />

      {/* Right Section: Best Seller Products Carousel */}
      <BestSellerCarousel />
    </div>
  );
}
