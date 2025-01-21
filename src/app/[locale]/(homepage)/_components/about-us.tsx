import Image from "next/image";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations();

  // Common style for check icon
  const checkIconStyles =
    "bg-purple-400 text-white w-[42px] h-[42px] rounded-full flex justify-center items-center";

  return (
    <div className="about-us flex w-[1280px] justify-between items-center">
      {/* About Us Gift Section */}
      <div className="about-us-gifts relative w-[530.49px] h-[376.95px] flex justify-between">
        {/* Main Gift Box */}
        <div
          className="about-us-gift-one z-10 relative w-[302px] h-[344px] mt-[24.21px] rounded-b-[120px] overflow-hidden
          ml-[27.49px] rounded-tl-[50px] rounded-tr-[120px] rtl:mr-[27.49px] rtl:rounded-tr-[50px] rtl:rounded-tl-[120px]
        "
        >
          <Image
            src="/assets/images/gift-box-1.png"
            alt="gift 1"
            fill
            className="object-cover"
          />
        </div>
        {/* Border Decoration */}
        <div
          style={{ transform: "rotate(3.09deg) rtl:rotate(-3.09deg)" }}
          className="absolute w-[268.88px] -z-1 h-[363px] border-4 border-light-pink-900 rounded-b-[120px] left-3 rounded-tl-[50px] rounded-tr-[120px] 
            rtl:right-3 rtl:rounded-tr-[50px] rtl:rounded-tl-[120px]"
        ></div>
        {/* Smaller Gift Boxes */}
        <div className="flex flex-col pt-[15.97px] gap-2">
          <div className="about-us-gift-two relative w-[193px] h-[193px] rounded-full">
            <Image
              src={"/assets/images/gift-box-2.png"}
              alt="..."
              fill
              className="rounded-full"
            />
          </div>
          <div className="about-us-gift-three relative w-[193px] h-[144px] rounded-s-[50px] rounded-e-[100px] overflow-hidden">
            <Image
              src="/assets/images/gift-box-3.png"
              alt="gift 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* About Us Content Section */}
      <div className="about flex flex-col w-[657px] gap-6">
        <h6
          className="text-[17px] font-bold uppercase text-light-pink-900"
          style={{ letterSpacing: "4px" }}
        >
          {t("about-us")}
        </h6>
        <div>
          <p className="text-blueGray-600 text-3xl font-bold w-[603px]">
            {t("we-provide-best-and-quality")}{" "}
            <span className="text-light-pink-900">
              {t("gifts")} <br /> {t("box")}
            </span>{" "}
            {t("product-for-you")}
          </p>
          <p className="text-blueGray-200 w-[631px]">
            {t(
              "at-rose-we-are-dedicated-to-curating-exceptional-products-that-inspire-our-mission-is-to-provide-quality-affordability-and-unmatched-customer-satisfaction-in-every-purchase"
            )}
          </p>
        </div>
        {/* Discover More Button */}
        <Button asChild>
          <Link href="/about">
            {t("discover-more")}
            <span className="ltr:inline rtl:hidden">
              <FaArrowRightLong />
            </span>
            <span className="rtl:inline ltr:hidden">
              <FaArrowLeftLong />
            </span>
          </Link>
        </Button>

        {/* About Us Offers */}
        <div className="about-us-offers grid grid-cols-2">
          {[
            t("streamlined-shipping-experience"),
            t("affordable-modern-design"),
            t("competitive-price-and-easy-to-shop"),
            t("we-made-awesome-products"),
          ].map((offer, index) => (
            <div key={index} className="mb-2 flex justify-start items-center">
              <div className={`${checkIconStyles} mr-[13.5px] rtl:ml-[13.5px]`}>
                <FaCheck />
              </div>
              <p className="text-xs font-medium">{offer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
