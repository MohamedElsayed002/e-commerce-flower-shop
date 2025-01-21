import React from 'react'
import FooterInput from '@/components/FooterInput/FooterInput'
import style from '@/components/shared/Footer/Footer.module.css'
import { useTranslations } from 'next-intl'


export default function Footer() {
  //Translation Part
    const t =useTranslations()
    const discount = 20;
  return (
    <main>
        <div className='footer cursor-pointer'>      
        {/* OverLay => Background Image */}
        <div className={`${style.element}`}> 
                <div className='flex flex-col justify-center items-center gap-10 '>
                  {/*Footer Header Contents */}
                <div className='flex gap-[80px] justify-center pt-10 pr-[80px] text-[16px] pl-[80px] font-bold'>
                    <p>{t('About Us')}</p>
                    <p>{t('Store Location')}</p>
                    <p>{t('Contact')}</p>
                    <p>{t('Delivery')} </p>
                    <p>{t('Policy')}</p>
                    <p>{t('FAQS')}</p>
                </div>
                <div className=' text-center flex flex-col gap-[40px]  pt-5 '>
                  {/* Discount Part */}
                    <div>
                    <p className="text-[30px] font-bold">
                     {t('discountOffer', { discount })}
                          </p>
                        <p className='text-[#757F95] text-[20px] font-medium'>{t('By Subscribe Our Newsletter')}</p>

                    </div>
                    {/* Subscribe Input */}
                    <div>
                    <FooterInput/>

                    </div>  
                </div>
            
                </div>
            </div>
        </div>
    </main>
  )
}












