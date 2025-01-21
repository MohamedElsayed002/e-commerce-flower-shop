import React from 'react'
import CarouselSlider from './components/comments-slider'

export default function CommentsSection() {
  return (
    <>
        <section className='comments-section py-6 md:py-10 xl:py-20 my-6 md:my-10 xl:my-20 bg-no-repeat bg-top bg-cover'>
            <div className="container mx-auto">
                <div >
                <CarouselSlider/>
                </div>
            </div>
        </section>
    </>
  )
}
