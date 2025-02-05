import React from "react";
import AboutUsGifts from "./components/about-us-gifts";
import AboutUsContent from "./components/about-us-content";

export default function AboutUs() {
  return (
    <div className="about-us flex w-[1280px] justify-between items-center">
      {/* About us gifts section */}
      <AboutUsGifts />

      {/* About us content section */}
      <AboutUsContent />
    </div>
  );
}
