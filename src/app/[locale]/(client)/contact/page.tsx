"use client";

import React from "react";
import ContactForm from "./_components/contact-form";
import ContactIcons from "./_components/contact-icons";
import { useTranslations } from "next-intl";

// Contact main page
export default function page() {
  // Translation
  const t = useTranslations();
  return (
    <>
      <div className="container m-auto flex flex-col my-10 ">
        <h1 className=" text-custom-rose-900 text-[17px] font-bold mt-5 leading-[30.6px] tracking-[0.15em]">
          {t("contact-us")}
        </h1>
        <div className="flex justify-between items-center">
          {/* Contact icons */}
          <ContactIcons />

          {/* Contact form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
