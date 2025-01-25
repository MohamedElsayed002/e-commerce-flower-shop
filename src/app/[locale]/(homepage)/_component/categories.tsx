
"use client"

import { useQuery } from "@tanstack/react-query"
import { FaWallet } from "react-icons/fa6";
import { TbCarCrane } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react"
import CarouselDemo from "./carousel-dots-slider";
import SpecialGifts from "./special-gifts";
import { Carousel, CarouselContent, CarouselItem } from "../../../../components/ui/carousel";



export default function Categories(){
  // Translation
const t = useTranslations();
 
 // Fetch categories data 
const{isLoading , error , data } = useQuery({
queryKey :['categories'],
queryFn : async () =>{
const response = await fetch('https://flower.elevateegy.com/api/v1/categories')
 if (!response.ok) {
throw new Error('error');
}
return response.json();
},
});


 // Handle loading and error 
if (isLoading) {
return (
<div className="flex justify-center items-center ">
<h1>loading...</h1>
</div>
);
}

if (error) {
return <div>Error: {error.message}</div>;
}

 // Render Categories UI
return(
<div className="container px-[8rem] ">

 {/* Categories Carousel */}
<Carousel>
<CarouselContent className="flex flex-row p-4">
{data.categories.map((category:any) => (
<CarouselItem
key={category._id}
className=" lg:basis-1/5">
<Link href={`/products/${category.slug}`}>
<div className="bg-custom-light-rose-50 rounded-xl shadow-lg flex items-center p-4 ">
<div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mr-4  rtl:ml-5 ">

<img
src={category.image}
alt={category.name}
className="w-10 h-10 "/>
</div>
     <div>
    <h3 className="text-sm font-semibold">
    {category.name}
   </h3>
  <p className="text-xs text-gray-500">
 {category.productsCount} items </p>
    </div>
    
   </div>
   </Link>
     </CarouselItem>
    ))}
   </CarouselContent>
</Carousel>


   {/* Section Special Gifts  and  slider */}

<CarouselDemo/>

  {/* Section  Gift*/}

<SpecialGifts/>


 {/* Section Features */}
  <div className="bg-custom-rose-50 py-8 p-7 mt-12 max-w-7xl rounded-lg">
<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="flex items-center space-x-3 ">
    <div className="bg-custom-light-rose-900 p-3 rounded-full rtl:ml-3">
    <TbCarCrane className="w-8 h-8 text-white  "/>
    </div>
 
    <p className="text-gray-500">
<span className="font-bold text-gray-800">{t('free-delivery')}</span>
<br />
{t('orders-over-120')}
    </p>
  </div>
  <div className="flex items-center space-x-3">
    <div className="bg-custom-light-rose-900 p-3 rounded-full max-w-10xl rtl:ml-3">
    <TfiReload  className="w-6 h-6 text-white " />
    </div>
  
 
    <p className="text-gray-500">
<span className="font-bold text-gray-800">{t('get-refund')}</span>
<br />
     {t('within-30-days-returns')}
    </p>
  </div>
  <div className="flex items-center space-x-3">
    <div className="bg-custom-light-rose-900 p-3 rounded-full rtl:ml-3">
    <FaWallet  className="w-6 h-6  text-white"/>
    </div>
 
    <p className="text-gray-500">
<span className="font-bold text-gray-800">{t('safe-payment')}</span>
<br />
{t('100-secure-payment')}
    </p>
  </div>
  <div className="flex items-center space-x-3">
    <div className="bg-custom-light-rose-900 p-3 rounded-full rtl:ml-3">
    <FaHeadset className="w-6 h-6  text-white" />
    </div>
 
  <p className="text-gray-500">
<span className="font-bold text-gray-800">{t('24-7-support')}</span>
<br />
{t('feel-free-to-call-us')}
    </p>
  </div>
</div>
</div>
</div>
 
 );
   }

