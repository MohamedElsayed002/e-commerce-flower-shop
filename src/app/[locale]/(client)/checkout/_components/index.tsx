import React from "react";
import AddressForm from "./billing-address-form";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import SummaryWrapper from "./cart-summary-wrapper";
import { PaymentForm } from "../../payment/_component/paymant";

export default function CheckoutContent() {
  // Translation
  const t = useTranslations();

  // Variables
  const locale = useLocale() as Locale;

  return (
    <div className="container grid grid-cols-2 lg:grid-cols-3 gap-8 my-10 px-4">
      <div className="lg:col-span-2 flex flex-col space-y-8">
        <div className="my-2">
          <AddressForm />
        </div>
        <div>
          <PaymentForm />
        </div>

        {/* Buttons */}
        <div className="flex justify-between align-middle mt-10">
          <Button
            type="submit"
            className="
        bg-custom-rose-900  
          rounded-[10px] 
          h-[49px]
          px-5
          py-[10px]
          font-medium 
          text-base
          text-center 
          shadow-[0px_0px_40px_5px_rgba(0, 0, 0, 0.05)]
          hover:bg-custom-rose-800   
          capitalize           
          "
          >
            {locale === "ar" ? <FaArrowRight /> : <FaArrowLeft />}
            {t("back-to-cart")}
          </Button>
          <Button
            type="submit"
            className="
        bg-custom-rose-900  
          rounded-[10px] 
          h-[49px]
          px-5
          py-[10px]
          font-medium 
          text-base
          text-center 
          shadow-[0px_0px_40px_5px_rgba(0, 0, 0, 0.05)]
          hover:bg-custom-rose-800   
          capitalize           
          "
          >
            {t("next-step")}
            {locale === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </Button>
        </div>
      </div>
      <div className="">
        <SummaryWrapper />
      </div>
    </div>
  );
}
