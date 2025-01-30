"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

export default function SpecialGifts() {
  // Translation
  const t = useTranslations();

  return (
    <div className="grid  grid-cols-3 mt-6  ">
      {/* First gift box */}
      <div className="relative">
        {/* Gift box image */}
        <Image
          className="rounded-[20px]"
          src="/img3.png"
          alt=""
          width={400}
          height={300}
          priority
        />
        {/* Overlay content for the first gift box */}
        <div className="absolute inset-0  flex flex-col justify-center items-end mr-[30px] text-white px-2 rtl:ml-7 ">
          <h3 className=" text-custom-rose-900 mb-2">{t("gifts-box")}</h3>
          <h2 className="text-[20px] font-semibold  text-gray-900 ">{t("awesome-gifts-box")}</h2>
          <h1 className="text-[20px] font-semibold text-gray-900 ">{t("collectons")}</h1>
          <Link href={`/products`}>
            <button className=" px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-4 ">
              {t("shop-now")}
            </button>
          </Link>
        </div>
      </div>
      {/* Second gift box */}
      <div className="relative">
        {/* Gift box image */}
        <Image
          className="rounded-[20px]"
          src="/img2.png"
          alt=""
          width={400}
          height={300}
          priority
        />
        {/* Overlay content for the second gift box */}
        <div className="absolute inset-0  flex flex-col justify-center items-end mr-[30px]  text-white rtl:ml-5 px-3 ">
          <h3 className=" text-custom-rose-900 mb-2">{t("occasion-gifts")}</h3>
          <h2 className=" text-[20px] font-semibold text-gray-900 ">{t("best-occasion-gifts")}</h2>
          <h1 className="text-[20px] font-semibold text-gray-900 ">{t("collectons")}</h1>
          <Link href={`/products`}>
            <button className=" px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-8 ">
              {t("discover-now")}
            </button>
          </Link>
        </div>
      </div>
      {/* Third gift box */}
      <div className="relative">
        {/* Gift box image */}
        <Image
          className="rounded-[20px]"
          src="/img1.png"
          alt=""
          width={400}
          height={300}
          priority
        />
        {/* Overlay content for the third gift box */}
        <div className="absolute inset-0  flex flex-col justify-center items-end mr-[30px]  text-white rtl:ml-5 px-2 ">
          <h3 className=" text-white mb-2">{t("occasion-gifts")}</h3>
          <h2 className="text-[20px] font-semibold text-gray-900  ">{t("combo-sets-gift-box")}</h2>
          <h1 className="text-[20px] font-semibold text-gray-900  "> {t("up-to-50-off")}</h1>
          <Link href={`/products`}>
            <button className=" px-2 py-2 bg-custom-rose-900 text-white rounded-full mt-8   ">
              {t("discover-now")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
