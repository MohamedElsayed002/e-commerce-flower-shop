import { useTranslations } from "next-intl";
import React from "react";

export default function DeliveryContent() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container my-20">
      {/* Main title */}
      <div className="mb-4 text-blue-gray-900 font-inter leading-[36px] capitalize">
        <h1 className="text-[30px] font-bold">{t("delivery-information")}</h1>
      </div>

      {/* Main points */}
      <div className="text-custom-grey space-y-8">
        <div>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-2 text-blue-gray-900">
            {t("shipping-times")}
          </h4>
          {/* Description */}
          <p className="text-xl">{t("shipping-times-paragraph")}</p>
          {/* Notes */}
          <ul className="list-disc list-inside mt-2 text-xl">
            <li>{t("standard-shipping")}</li>
            <li>{t("express-shipping")}</li>
            <li>{t("international-shipping")}</li>
          </ul>
        </div>

        {/* Delivery zones & availability section */}
        <div>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-2 text-blue-gray-900">
            {t("delivery-zones-availability")}
          </h4>
          {/* Description */}
          <p className="text-xl">{t("delivery-zones-paragraph")}</p>
          {/* Notes */}
          <ul className="list-disc list-inside mt-2 text-xl">
            <li>{t("united-states-and-canada")}</li>
            <li>{t("european-union-countries")}</li>
            <li>{t("selected-countries")}</li>
          </ul>
          <p className="mt-2">{t("delivery-zones-note")}</p>
        </div>

        {/* Shipping fees section */}
        <div>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-2 text-blue-gray-900">
            {t("shipping-fees")}
          </h4>
          {/* Notes */}
          <ul className="list-disc list-inside mt-2 text-xl">
            <li>{t("shipping-fees-note-one")}</li>
            <li>{t("shipping-fees-note-two")}</li>
            <li>{t("shipping-fees-note-three")}</li>
          </ul>
        </div>

        {/* Missed delivery section */}
        <div>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-2 text-blue-gray-900">
            {t("missed-delivery")}
          </h4>
          {/* Notes */}
          <ul className="list-disc list-inside mt-2 text-xl">
            <li>{t("missed-delivery-note-one")}</li>
            <li>{t("missed-delivery-note-two")}</li>
            <li>{t("missed-delivery-note-three")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
