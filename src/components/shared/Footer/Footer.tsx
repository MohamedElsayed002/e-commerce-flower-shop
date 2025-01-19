import React from 'react'
import FooterInput from '@/components/FooterInput/FooterInput'
import style from '@/components/shared/Footer/Footer.module.css'

export default function Footer() {
  return (
    <main>
        <div className='' >
            <div className={`${style.element}  `}>
                <div className='flex flex-col justify-center items-center gap-14 '>
                <div className='flex gap-[80px] justify-center pt-10 pr-[80px] pl-[80px] font-bold'>
                    <p>About US</p>
                    <p>Store Location</p>
                    <p>Contact</p>
                    <p>Delivery </p>
                    <p>Policy</p>
                    <p>FAQS</p>
                </div>
                <div className='font-bold text-center'>
                    <p className='text-2xl'>Get 
                        <span className='text-[#F82BA9] font-bold'>
                        20%

                        </span>
                         Off Discount Coupon</p>
                        <p className='text-[#757F95]'>By Subscribe Our Newsletter</p>

                </div>
            <FooterInput/>
                </div>
        
            </div>

        </div>
   

       
    </main>



  )
}




 






