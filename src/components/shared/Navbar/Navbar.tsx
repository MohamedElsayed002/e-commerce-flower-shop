import React from 'react'
import Image from 'next/image'
import logo from '../../../../Public/assets/images/logo.png'
import { FaRegHeart } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


export default function Navbar() {
  return (
    <main>
        <div className=' cursor-pointer  '>
            <div className=' container m-auto   flex items-center  justify-between pl-[80px] pr-[80px]   '>
                <div>
                   <Image src={logo} alt='logo' className='w-[86px] h-[86px] p-2' />

                </div>
                <div className='flex gap-[24px] text-[16px] font-bold text-[#160E4B]'>
                    <p className='text-[#F82BA9]'>Home</p>
                    <p className=' hover:text-[#F82BA9]'>All Category</p>
                    <p className=' hover:text-[#F82BA9]'>About</p>
                    <p className=' hover:text-[#F82BA9]'>Contact</p>

                    </div>
                    <div className='flex gap-5   '>
                    <IoSearch  className='w-[20px] h-[21px] text-[#F82BA9]'/>
                    <FaRegHeart className='w-[20px] h-[21px] text-[#F82BA9]'/>
                    <IoLockClosedOutline className='w-[30px] h-[21px] text-[#F82BA9]'/>
                    </div>
                </div>
            </div>
 

        
    </main>
  )
}
