"use client";

import { TfiReload } from "react-icons/tfi";
import { BsHeadset, BsTruck } from "react-icons/bs";
import { LuWalletMinimal } from "react-icons/lu";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import CarouselDemo from "./carousel-dots-slider";
import SpecialGifts from "./special-gifts";
import { Carousel, CarouselContent, CarouselItem } from "../../../../components/ui/carousel";

export default function Categories({ data }) {
  // Translation
  const t = useTranslations();

  return (
    <div className="container px-[8rem] ">
      {/* Categories Carousel */}
      <Carousel>
        <CarouselContent className="flex flex-row p-4">
          {data.categories.map((category: any) => (
            <CarouselItem key={category._id} className=" lg:basis-1/5">
              <Link href={`/products/${category.slug}`}>
                <div className="bg-custom-rose-50 rounded-xl  flex items-center p-4 ">
                  {/* Category icon */}
                  <div className="w-16 h-16  bg-custom-rose-900 rounded-full flex items-center justify-center mr-4  rtl:ml-5 ">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 ilter brightness-0 invert"
                    />
                  </div>

                  {/* Category details */}
                  <div>
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                    <p className="text-xs text-gray-500">
                      {category.productsCount}
                      {t("items")}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Section Special Gifts  and  slider */}
      <CarouselDemo />

      {/* Section  Gift*/}
      <SpecialGifts />

      {/* Section Features */}
      <div className="bg-custom-rose-50 py-8 p-7 mt-12 max-w-7xl rounded-lg">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="flex items-center space-x-3 ">
            <div className="bg-custom-rose-900 p-3 rounded-full rtl:ml-3">
              <BsTruck className="w-8 h-8 text-white " />
            </div>
            <p className="text-gray-500">
              <span className="font-bold text-gray-800">{t("free-delivery")}</span>
              <br /> <span className="text-sm"> {t("orders-over-120")}</span>
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center space-x-3">
            <div className="bg-custom-rose-900 p-3 rounded-full max-w-10xl rtl:ml-3">
              <TfiReload className="w-6 h-6 text-white " />
            </div>
            <p className="text-gray-500">
              <span className="font-bold text-gray-800">{t("get-refund")}</span>
              <br />
              <span className="text-sm"> {t("within-30-days-returns")}</span>
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center space-x-3">
            <div className="bg-custom-rose-900 p-3 rounded-full rtl:ml-3">
              <LuWalletMinimal className="w-6 h-6  text-white" />
            </div>
            <p className="text-gray-500">
              <span className="font-bold text-gray-800">{t("safe-payment")}</span>
              <br /> <span className="text-sm"> {t("100-secure-payment")}</span>
            </p>
          </div>

          {/* Feature 4: 24/7 Support */}
          <div className="flex items-center space-x-3">
            <div className="bg-custom-rose-900 p-3 rounded-full rtl:ml-3">
              <BsHeadset className="w-6 h-6  text-white" />
            </div>
            <p className="text-gray-500 ">
              <span className="font-bold text-gray-800">{t("24-7-support")}</span>
              <br /> <span className="text-sm"> {t("feel-free-to-call-us")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
