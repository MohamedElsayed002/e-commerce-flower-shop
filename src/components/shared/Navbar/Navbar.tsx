'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../../../Public/assets/images/logo.png'
import { FaRegHeart } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useTranslations } from 'next-intl';
import Tbutton from "@/components/shared/Tbutton/Tbutton"

export default function Navbar() {

  const t = useTranslations()
  return (
    <main>
        <div className=' cursor-pointer  '>
            <div className=' container m-auto   flex items-center  justify-between pl-[80px] pr-[80px]   '>
              {/* Logo */}
                <div>
                   <Image src={logo} alt='logo' className='w-[86px] h-[86px] p-2' />

                </div>
                {/* Navigation Links */}
                <div className='flex gap-[24px] text-[16px] font-bold text-[#160E4B]'>
                    <a className='text-[#F82BA9]'>{t('Home')}</a>
                    <a className=' hover:text-[#F82BA9]'>{t('All Category')}</a>
                    <a className=' hover:text-[#F82BA9]'>{t('About')}</a>
                    <a className=' hover:text-[#F82BA9]'>{t('Contact')}</a>
                    </div>
                    {/* Icons */}
                    <div className='flex gap-5   '>
                    <IoSearch  className='w-[20px] h-[21px] text-[#F82BA9]'/>
                    <FaRegHeart className='w-[20px] h-[21px] text-[#F82BA9]'/>
                    <IoLockClosedOutline className='w-[30px] h-[21px] text-[#F82BA9]'/>
                  <Tbutton/>
                    </div>
                </div>
            </div>
    </main>
  )
}
