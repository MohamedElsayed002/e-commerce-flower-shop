import Image_1 from '@/../public/assets/images/gallery/gallery-1.png'
import Image_2 from '@/../public/assets/images/gallery/gallery-2.png'
import Image_3 from '@/../public/assets/images/gallery/gallery-3.png'
import Image_4 from '@/../public/assets/images/gallery/gallery-4.png'
import Image_5 from '@/../public/assets/images/gallery/gallery-5.png'
import Image, { StaticImageData } from 'next/image'

export default function GallerySection() {

  const images: StaticImageData[] = [Image_1, Image_2, Image_3, Image_4, Image_5];
  
  return (
    <>
        <section className='my-6 md:my-10 xl:my-20 px-6 md:px-0'>
            <div className="container mx-auto">
              <GalleryHeading/>
              {/* Gallery Photos */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {images.map((image, i) => 
                  <div key={i} className={`w-full h-[411px] relative ${i === 3 ? 'sm:col-span-2' : ''}`}>
                    <Image src={image} alt={`Gallery's Photo ${i + 1}`} fill sizes='100%' className="object-fill"/>
                  </div>
                )}
              </div>
            </div>
        </section>
    </>
  )
}

function GalleryHeading () {
  return (
    <>
      <div className="flex flex-col sm:items-center gap-2 mb-10 relative z-10 max-w-[438px] mx-auto">
        <h2 className="text-rose-900 uppercase font-roboto font-bold text-[17px] leading-[30.6px] tracking-[4px]">
          Our Gallery
        </h2>
        <p className={`text-blueGray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10`}>
          Let&#39;s Check Our Photo Gallery
        </p>
        <div className='absolute top-[57px] sm:left-2.5 z-0 w-[338px] h-[17px] bg-[#FEEDF7] rounded-tr-[20px] rounded-br-[20px] after:absolute after:bottom-0 after:left-0 after:w-[161px] after:h-[2px] after:bg-rose-900'>
        </div>
      </div>
    </>
  )
}