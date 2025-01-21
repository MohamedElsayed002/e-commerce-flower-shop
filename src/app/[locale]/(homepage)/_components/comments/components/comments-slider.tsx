'use client'

import { useState } from "react";
import Image from "next/image";
import CommentIcon from '@/../public/assets/images/comments/comment-icon.png'
import { Card, CardContent } from '@/components/ui/card';
import { AvatarDemo } from "./comment-avatar";
import { FaStar } from "react-icons/fa6";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselSlider() {

  const [active, setIsActive] = useState<'prev' | 'next'>('prev');
  return (
    <>
      <Carousel opts={{ align: "start", }} className="w-full" >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <Card className="border-none rounded-[100px] rounded-tl-[50px]">
                  <CardContent className="flex flex-col aspect-square p-6 box">
                  
                  {/* AVATAR & NAME */}
                      <div className="flex justify-between items-center max-w-[223px] mb-6">
                        <div className="relative w-[60px] h-[60px] flex justify-center items-center">

                          <div className="avatar-frame absolute inset-[-1px] rounded-full bg-transparent"></div>
                              <span className="relative w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center overflow-hiddn">
                                  <AvatarDemo ImageSrc={`/assets/images/comments/comment-avatar-${i+1}.jpg`}/>
                              </span>
                          </div>


                          <div>
                              <h3 className="text-[17px] text-blueGray-900 font-inter font-bold">Ahmed Mohamed</h3>
                              <h4 className="text-[17px] text-rose-900 font-inter font-bold">Customer</h4>
                          </div>

                        </div>

                      <div className="bg-blueGray-500 border-[0.5px]"></div>

                  {/* COMMENT */}
                  <div className="pt-6">
                      <p className="text-sm text-blueGray-500 font-inter font-normal leading-[18px]"> 
                      Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.
                      </p>
                  </div>

                  <div className="flex justify-between items-center">
                      <ul className="flex justify-start gap-1">
                          {Array.from({ length: 4 }).map((_, i) => 
                          <li key={i}>
                              <FaStar className="text-rose-900 w-[17px]" />
                          </li>
                          )}
                      </ul>

                      <div className="pr-2">
                          <Image src={CommentIcon} alt="Comment Icon"/>
                      </div>
                  </div>

                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      
      <span onClick={() => setIsActive('prev')}>
        <CarouselPrevious />
      </span>
      
      <span onClick={() => setIsActive('next')}>
        <CarouselNext />
      </span>
        
      </Carousel>


    

          {/* Dots */}
          <div className="flex justify-center mt-10 gap-2">
            {['prev', 'next'].map((item) => (
              <div key={item} className={`h-4 rounded-full duration-300 bg-white 
              ${ active === item ? 'w-[36px]' : 'w-4'}`}/>
            ))}
          </div>
    </>
  )
}
