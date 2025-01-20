


"use client";
import { FaGlobe } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LocaleToggle() {
  
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

 
  const switchLocale = (locale: "en" | "ar") => {

    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  
  };
  

  return (

    //     <div className="relative inline-block text-left">
     
       
    //     <button
    //     onClick={() => setDropdownOpen(!dropdownOpen)}
    //     className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    //     aria-expanded={dropdownOpen}
    //     aria-haspopup="true"
    //   >
    //     <FaGlobe className="mr-2" />
    //     اختر اللغة
    //   </button>
    //   {dropdownOpen && (
    //     <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
    //       <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //         <Button
    //           variant="ghost"
    //           className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //           onClick={() => switchLocale('en')}
    //         >
    //           English
    //         </Button>
           
    //       <Button variant="ghost" className="w-full " onClick={() => switchLocale("ar")}>
    //         Arabic
    //        </Button>



    //         </div>
           
          
      
         


      
       
         
            
            
      
    //        </div>
    //   )}
    //   </div>
    <main>
    <FaGlobe />
    <Button variant="ghost" className="w-full justify-start" onClick={() => switchLocale("en")}>
    English
      </Button>
      <Button variant="ghost" className="w-full justify-start" onClick={() => switchLocale("ar")}>
        العربية
       </Button>
</main>

   
  )}
 
 


