'use client'

import React from "react";
import ContactForm from "./_components/contact-form";
import ContactIcons from "./_components/contact-icons";
import { useTranslations } from "next-intl";

// Contact Main Page
export default function page() {
  const t=useTranslations()
  return (
    <>
      <div className="container m-auto flex flex-col my-10 ">
        <h1 className=" text-custom-rose-900 text-[17px] font-bold mt-5">{t('contact-us')}</h1>
        <div className="flex justify-between items-center">
          {/* Contact Icons */}
          <ContactIcons />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
