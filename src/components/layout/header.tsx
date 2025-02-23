"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/common/toggle-locale";
import LoginForm from "../features/auth/components/login-form";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Translation
  const t = useTranslations();

  return (
    <header>
      <div className=" container m-auto   flex items-center  justify-between ps-20">
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt="Flower App"
          width={86}
          height={0}
          className=" p-2"
        />

        {/* Navigation Links */}
        <div className="flex gap-6 text-base font-medium text-[#160E4B]">
          <Link href="/" className="transition-colors text-custom-rose-900">
            {t("home")}
          </Link>
          <Link href="#" className="transition-colors  hover:text-custom-rose-900">
            {t("all-categories")}
          </Link>
          <Link href="#" className="transition-colors  hover:text-custom-rose-900">
            {t("about-us")}
          </Link>
          <Link href="#" className="transition-colors  hover:text-custom-rose-900">
            {t("contact")}
          </Link>
        </div>

        {/* Icons */}
        <div className="flex gap-5">
          <IoSearch className="w-5 h-5 text-custom-rose-900" />
          <FaRegHeart className="w-5 h-5 text-custom-rose-900" />
          <IoLockClosedOutline className="w-[30px] h-5 text-custom-rose-900" />
          <LocaleToggle />
          <button
            onClick={() => setIsModalOpen(true)}
            className=" w-[52px] bg-[#F82BA9] text-white rounded-lg"
          >
            Login
          </button>
          {/* Login Modal */}
          {isModalOpen && <LoginForm closeModal={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
