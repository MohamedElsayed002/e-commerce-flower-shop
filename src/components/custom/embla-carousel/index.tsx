"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-buttons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { getThreeWords } from "@/lib/utils/string";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";

type PropType = {
  slides: Product[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((product, index) => (
            <div className="embla__slide flex flex-col" key={index}>
              <div className="bg-rose-50 px-5 pb-[29.8px] pt-5 rounded-[20px] mb-4 relative">
                <div className="w-[262px] h-[222px]">
                  <Image
                    src={product.imgCover}
                    alt={product.title}
                    width={262}
                    height={222}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="badge bg-rose-400 px-[15px] py-[2px] rounded-full absolute top-2 right-2 text-[11px] text-white uppercase font-medium tracking-[1px]">New</p>
              </div>
              <div className="product-data w-[302px] flex justify-between items-center">
                <div className="flex flex-col justify-start gap-[9px]">
                  <h6 className="text-start text-[17px] font-semibold text-blueGray-600">
                    {getThreeWords(product.title)}
                  </h6>
                  <div className="flex text-[#FBA707]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                  </div>
                  <p className="text-base text-[#F05454] font-medium text-start">
                    ${product.priceAfterDiscount || product.price.toFixed(2)}{" "}
                    {product.priceAfterDiscount && (
                      <span className="line-through text-blueGray-100">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-white bg-purple-400 w-[42px] h-[42px] rounded-full flex justify-center items-center">
                  <BsHandbag />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
