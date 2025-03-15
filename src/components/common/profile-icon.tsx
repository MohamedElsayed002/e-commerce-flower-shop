'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'
import { Link } from '@/i18n/routing'
import { Button } from '../ui/button'
import { CgProfile } from "react-icons/cg";

export default function ProfileIcon() {
    // Translations
    const t = useTranslations()
    
    return (
        <DropdownMenu>
          {/*  Profile icon */}
          <DropdownMenuTrigger><CgProfile className='text-custom-rose-800 w-5 h-5'/></DropdownMenuTrigger>
          {/* Links */}
          <DropdownMenuContent>
            {/* Profile page */}
            <Link href="/profile"><DropdownMenuItem className='focus:bg-custom-rose-600 hover:cursor-pointer focus:text-white p-2'>{t("profile")}</DropdownMenuItem></Link>
            {/* Orders page */}
            <Link  href="/orders"><DropdownMenuItem className='focus:bg-custom-rose-600 hover:cursor-pointer focus:text-white p-2'>{t("orders-page")}</DropdownMenuItem></Link>
            {/* Logout */}
            <DropdownMenuItem><Button onClick={() => signOut()} className='text-white bg-custom-rose-800 hover:bg-custom-rose-500 '>{t("signout")}</Button></DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
    )
}
