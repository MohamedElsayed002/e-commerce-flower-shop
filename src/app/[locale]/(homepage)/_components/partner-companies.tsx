import Company_1 from '@/../public/assets/images/companies/company-1.png'
import Company_2 from '@/../public/assets/images/companies/company-2.png'
import Company_3 from '@/../public/assets/images/companies/company-3.png'
import Company_4 from '@/../public/assets/images/companies/company-4.png'
import Company_5 from '@/../public/assets/images/companies/company-5.png'
import Company_6 from '@/../public/assets/images/companies/company-6.png'
import Image, { StaticImageData } from 'next/image'

const images: StaticImageData[] = [Company_1, Company_2, Company_3, Company_4, Company_5, Company_6]

export default function CompaniesSection() {
  return (
    <>
         <section className='py-10'>
          <div className="container mx-auto">
            <div className='flex flex-col items-center gap-10 bg-main rounded-[20px] py-10 px-6'>
              <div className=" relative z-10 max-w-[509px] mx-auto">
                <h2 className="text-blueGray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10  after:absolute after:top-[35px] after:left-0 after:w-[151px] after:h-[2px] after:bg-rose-900">
                  Trusted By Over <span className='text-rose-900'>4.5k+</span> Companies
                </h2>
              </div>

               {/* Companies Logos */}
              <ul className='w-full flex justify-between items-center'>
                {images.map((image, i) => 
                  <li key={i} className='max-w-[147px]'>
                    <Image src={image} alt={`Company's Logo`} className='w-full' />
                  </li>
                )}

              </ul>
            </div>
          </div>
         </section>
    </>
  )
}