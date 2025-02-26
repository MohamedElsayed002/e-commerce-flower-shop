"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { IoLockClosedOutline, IoSearch } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/common/toggle-locale";
import LoginForm from "../features/auth/components/login-form";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Header() {
  // Translation
  const t = useTranslations();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { data: session } = useSession();

  return (
    <header>
      <div className="container m-auto flex items-center justify-between ps-20">
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt="Flower App"
          width={86}
          height={0}
          className="p-2"
        />

        {/* Navigation Links */}
        <div className="flex gap-6 text-base font-medium text-[#160E4B]">
          <Link href="/" className="transition-colors text-custom-rose-900">
            {t("home")}
          </Link>
          <Link href="#" className="transition-colors hover:text-custom-rose-900">
            {t("all-categories")}
          </Link>
          <Link href="#" className="transition-colors hover:text-custom-rose-900">
            {t("about-us")}
          </Link>
          <Link href="#" className="transition-colors hover:text-custom-rose-900">
            {t("contact")}
          </Link>
        </div>

        <div className="flex gap-5">
          {/* Icons if session is exist */}
          {session && (
            <>
              <IoSearch className="w-5 h-5 text-custom-rose-900" />
              <FaRegHeart className="w-5 h-5 text-custom-rose-900" />
              <IoLockClosedOutline className="w-[30px] h-5 text-custom-rose-900" />
              <LocaleToggle />
            </>
          )}

          {/* Login button and search icon if session isnot exist) */}
          <div className="flex items-center gap-5">
            {!session && (
              <>
                <IoSearch className="w-[20px] h-[21px]  text-custom-rose-900" />
                <LocaleToggle />
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-[80px] h-[45px]  font-medium text-[16px] rounded-[30px] pt-[8px] pb-[8px] pr-[20px] pl-[20px] bg-custom-rose-900 text-white"
                >
                  {t("login")}
                </Button>
                {isModalOpen && <LoginForm closeModal={() => setIsModalOpen(false)} />}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
