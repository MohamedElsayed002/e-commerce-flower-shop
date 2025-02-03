import Image from "next/image";
import React from "react";

export default function AboutUsGifts() {
  return (
    <div className="about-us-gifts relative w-[530.49px] h-[376.95px] flex justify-between">
      {/* Main gift box */}
      <div
        className="about-us-gift-one z-10 relative w-[302px] h-[344px] mt-[24.21px] rounded-b-[120px] overflow-hidden
      ml-[27.49px] rounded-tl-[50px] rounded-tr-[120px] rtl:mr-[27.49px] rtl:rounded-tr-[50px] rtl:rounded-tl-[120px]"
      >
        <Image
          src="/assets/images/gift-box-1.png"
          alt="gift 1"
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 250px, 302px"
          className="object-cover"
        />
      </div>

      {/* Border decoration */}
      <div
        className="absolute w-[268.88px] rotate-[3.09deg] rtl:-rotate-[3.09] -z-1 h-[363px] border-4 border-custom-rose-900 rounded-b-[120px] left-3 rounded-tl-[50px] rounded-tr-[120px] 
          rtl:right-3 rtl:rounded-tr-[50px] rtl:rounded-tl-[120px]"
      ></div>

      {/* Smaller gift boxes */}
      <div className="flex flex-col pt-[15.97px] gap-2">
        {/* Second gift box */}
        <div className="about-us-gift-two relative w-[193px] h-[193px] rounded-full">
          <Image
            src="/assets/images/gift-box-2.png"
            alt="gift 2"
            fill
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 193px"
            className="rounded-full"
          />
        </div>

        {/* Third gift box */}
        <div className="about-us-gift-three relative w-[193px] h-[144px] rounded-s-[50px] rounded-e-[100px] overflow-hidden">
          <Image
            src="/assets/images/gift-box-3.png"
            alt="gift 3"
            fill
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 193px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
