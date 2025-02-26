import React from "react";
import AboutUsGifts from "./components/about-us-gifts";
import AboutUsContent from "./components/about-us-content";

export default function AboutUs() {
  return (
    <div className=" flex justify-between items-center container gap-16">
      {/* About us gifts section */}
      <AboutUsGifts />

      {/* About us content section */}
      <AboutUsContent />
    </div>
  );
}
