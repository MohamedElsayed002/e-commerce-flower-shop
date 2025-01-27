import React from "react";

interface CarouselDotsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
  className?: string;
  dotClassName?: (index: number) => string;
}

export function CarouselDots({ totalSlides, onDotClick, dotClassName }: CarouselDotsProps) {
  return (
    <div className="flex space-x-2  ">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={
            dotClassName ? dotClassName(index) : "w-2 h-2 rounded-full transition-all duration-300"
          }
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
