import React from "react";
import BestSellerContent from "./components/best-seller-content";
import BestSellerCarousel from "./components/best-seller-carousel";

export default function BestSeller() {
  return (
    <div className="grid grid-cols-4 gap-6 my-20 container">
      {/* About best sellers products */}
      <BestSellerContent />

      {/* Best seller products carousel */}
      <BestSellerCarousel />
    </div>
  );
}
