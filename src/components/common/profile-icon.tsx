import { useTranslations } from 'next-intl'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getSession, signOut } from 'next-auth/react'
import { Link, redirect } from '@/i18n/routing'
import Image from 'next/image'  
import { Button } from '../ui/button'
import { CgProfile } from "react-icons/cg";

export default function ProfileIcon() {
    // translations
    const t = useTranslations()
    //check if user is signed in
    const userSession = getSession()
    
    return (
        <DropdownMenu>
          {/*  Profile Icon */}
          <DropdownMenuTrigger><CgProfile className='text-custom-rose-800 w-5 h-5'/></DropdownMenuTrigger>
          {/* Links */}
          <DropdownMenuContent>
              {/* Profile page */}
            <DropdownMenuItem><Link href="/profile">{t("profile")}</Link></DropdownMenuItem>
            {/* Orders Page */}
            <DropdownMenuItem><Link href="/orders">{t("orders-page")}</Link></DropdownMenuItem>
            {/* Log Out */}
            <DropdownMenuItem><Button onClick={() => {signOut()}}>{t("signout")}</Button></DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
    )
}