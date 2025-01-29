import React from "react";
import BestSellerContent from "./components/best-seller-content";
import BestSellerCarousel from "./components/best-seller-carousel";

export default function BestSeller() {
  return (
    <div className="best-seller flex justify-between px-0 mb-20">
      {/* About best sellers products */}
      <BestSellerContent />

      {/* Best seller products carousel */}
      <BestSellerCarousel />
    </div>
  );
}
