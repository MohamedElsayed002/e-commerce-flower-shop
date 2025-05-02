import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import React from "react";

export default function FaqContent() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container my-20">
      {/* Main title */}
      <div className="mb-4 text-blue-gray-900 font-inter leading-[36px] capitalize">
        <h1 className="text-[30px] font-bold">{t("faq-title")}</h1>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {/* Ordering process */}
        <AccordionItem value="ordering">
          <AccordionTrigger className="text-xl">{t("ordering-title")}</AccordionTrigger>
          <AccordionContent>{t("ordering-answer")}</AccordionContent>
        </AccordionItem>

        {/* Shipping */}
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-xl">{t("shipping-title")}</AccordionTrigger>
          <AccordionContent>{t("shipping-answer")}</AccordionContent>
        </AccordionItem>

        {/* Payment */}
        <AccordionItem value="payment">
          <AccordionTrigger className="text-xl">{t("payment-title")}</AccordionTrigger>
          <AccordionContent>{t("payment-answer")}</AccordionContent>
        </AccordionItem>

        {/* Returns & refunds */}
        <AccordionItem value="returns">
          <AccordionTrigger className="text-xl">{t("returns-title")}</AccordionTrigger>
          <AccordionContent>{t("returns-answer")}</AccordionContent>
        </AccordionItem>

        {/* Product questions */}
        <AccordionItem value="product">
          <AccordionTrigger className="text-xl">{t("product-title")}</AccordionTrigger>
          <AccordionContent>{t("product-answer")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
