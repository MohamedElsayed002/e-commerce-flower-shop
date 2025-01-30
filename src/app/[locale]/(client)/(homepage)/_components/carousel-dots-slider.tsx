"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { cn } from "@/lib/utils";

// Function Carousel Dots slider
export default function CarouselDotsSlider() {
  // Translation
  const t = useTranslations();

  // State
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Initialize state and event listener when API is available
  React.useEffect(() => {
    if (!api) {
      return;
    }
    // Set the total number of slides
    setCount(api.scrollSnapList().length);
    // Set the initially selected slide
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-row space-x-3 ">
      {/* Section: Left Image with Details */}
      <div className="basis-1/4 relative  ml-2   ">
        {/* Image */}
        <Image
          className="rounded-[15px] mt-3"
          src="/Red christmas gifts with white ribbon.png"
          alt=""
          width={400}
          height={400}
          priority
        />

        {/* Overlay with Text and Button */}
        <div className="absolute inset-0  flex flex-col justify-end items-start  text-white ml-6 mb-6 rtl:mr-3 ">
          {/* Text*/}
          <h3 className="text-md font-semibold text-custom-rose-900 mb-3">{t("start-10-99")}</h3>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {t("special-gifts-box")}
            <p className="text-2xl font-bold text-gray-800 ">{t("for-your-love")}</p>
          </h1>
          {/* Button */}
          <Link href={`/products`}>
            <button className=" px-5 py-3 bg-custom-rose-900 text-white rounded-lg rtl:mb-4 mb-2 ">
              {t("shop-now")} →
            </button>
          </Link>
        </div>
      </div>

      {/*  Slides  */}
      <div className="basis-1/1 ">
        <div className="max-w-5xl mt-3 px-3 mr-4">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="relative overflow-hidden h-[428px] rounded-[15px] rtl:mb-5 "
          >
            <CarouselContent className="flex">
              {/* map for img slider  */}
              {["/slider1.jpg", "/slider2.png", "/slider3.jpg"].map((img, idx) => (
                <CarouselItem key={idx} className="relative min-w-full">
                  {/* Image */}
                  <Image
                    className="w-full h-[428px] object-cover "
                    src={img}
                    alt="Slide"
                    width={600}
                    height={400}
                    priority
                  />

                  {/* Overlay Text on Each Slide */}
                  <div className="absolute inset-0  flex flex-col justify-center items-start px-10 text-white ml-5  ">
                    {/*Text */}
                    <h3 className="text-lg font-semibold text-custom-rose-900  mb-6">
                      {t("best-gift-shop")}
                    </h3>
                    {/*Text */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-5">
                      {t("choose-perfect")}
                      <h2>
                        <span className="text-custom-rose-900 ">{t("gifts")} </span>
                        {t("from-us")}
                      </h2>
                    </h1>
                    {/*Text */}
                    <p className="text-gray-600 mb-2">
                      {t("we-have-the-best-gifts-and-the-best-departments")}
                    </p>
                    {/*Text */}
                    <p className="text-gray-600 mb-2">
                      {t("choose-the-best-gifts-for-occasions-from-several-categories")}
                    </p>
                    {/* Button */}
                    <Link href={`/products`}>
                      <button className="mb-5 px-5 py-3 bg-custom-rose-900 text-white rounded-lg mt-6  ">
                        {t("shop-now")} →
                      </button>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute rtl:-bottom-1 rtl:ms-12 -left-15 right-12 me-12 -top-15   bottom-3 bg-white	 text-black p-2 rounded-full " />
            <CarouselNext className=" right-12 -top-15 bottom-3  rtl:-bottom-1 bg-white text-black p-2 rounded-full" />
            {/* Dots Buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center ">
              <CarouselDots
                totalSlides={count}
                currentSlide={current}
                onDotClick={(index) => api?.scrollTo(index)}
                className="my-4"
                dotClassName={(index) =>
                  cn(
                    "w-2 h-2 rounded-full transition-all  rtl:m-2 ",
                    current === index ? "bg-custom-rose-900 w-5  " : "bg-custom-rose-900 "
                  )
                }
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
