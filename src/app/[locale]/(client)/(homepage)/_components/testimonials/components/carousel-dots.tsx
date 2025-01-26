import { cn } from "@/lib/utils/cn"

type CarouselDotsProps = {
  totalItems: number
  visibleItems: number
  activeIndex: number
  onDotClick: (index: number) => void
}

const CarouselDots = ({ totalItems, visibleItems, activeIndex, onDotClick }: CarouselDotsProps) => {
  const dotsCount = Math.min(totalItems - visibleItems + 1, 5)

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: dotsCount }).map((_, index) => (
        <button
          type="button"
          title={`Go to slide ${index + 1}`}
          key={index}
          className={cn(
            "h-3 md:h-4 rounded-full transition-all bg-white relative z-10",
            index === activeIndex ? "w-6 md:w-[36px]" : "w-3 md:w-4",
          )}
          onClick={() => onDotClick(index)} 
        />
      ))}
    </div>
  )
}

export default CarouselDots

