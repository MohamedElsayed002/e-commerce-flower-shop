
"use client"

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react"

export default function SpecialGifts(){
    
      // Translation
 const t = useTranslations();


return(

 <div className="grid gap-x-8 mr-3 grid-cols-3 mt-4 space-x-1 rtl:ml-5">
  <div className="relative"> 
<Image
  className="rounded-lg"
src="/img3.png" 
alt=""
width={400} 
height={300}
priority />

<div className="absolute inset-0  flex flex-col justify-center items-end mr-5 text-white rtl:m-3 ">
<h3 className=" text-custom-light-rose-900 mb-2">
{t('gifts-box')}
</h3>
<h2 className="text-1xl font-bold text-gray-800 ">
 {t('awesome-gifts-box')} 
</h2>
<h1 className="text-1xl font-bold text-gray-800 "> {t('collectons')}</h1>
<Link href={`/products`}>
<button   className=" px-4 py-2 bg-custom-light-rose-900 text-white rounded-full mt-3 ">
{t('shop-now')}
</button>
</Link>
</div> 
</div>
<div className="relative">  
<Image
className="rounded-lg"
src="/img2.png" 
alt=""
width={400} 
height={300}
priority />
<div className="absolute inset-0  flex flex-col justify-center items-end mr-5 text-white rtl:m-3  ">
<h3 className=" text-custom-light-rose-900 mb-2">
{t('occasion-gifts')}
</h3>
<h2 className="text-1xl font-bold text-gray-800 ">
{t('best-occasion-gifts')}
</h2>
<h1 className="text-1xl font-bold text-gray-800 "> {t('collectons')}</h1>
<Link href={`/products`}>
<button className=" px-4 py-2 bg-custom-light-rose-900 text-white rounded-full mt-5 ">
{t('discover-now')}
</button>
</Link>
</div> 
</div>

<div className="relative">  
<Image
className="rounded-lg"
src="/img1.png" 
alt=""
width={400} 
height={300}
priority />
<div className="absolute inset-0  flex flex-col justify-center items-end mr-5 text-white rtl:m-3  ">
    <h3 className=" text-white mb-2">
    {t('occasion-gifts-0')}
</h3>
<h2 className="text-1xl font-bold text-gray-800 ">
{t('combo-sets-gift-box')}
</h2>
<h1 className="text-1xl font-bold text-gray-800 "> {t('up-to-50-off')}</h1>
<Link href={`/products`}>
<button className=" px-4 py-2 bg-custom-light-rose-900 text-white rounded-full mt-5 ">
{t('discover-now')}
</button>
</Link>
    </div> 
</div>

    </div>
)
   
}