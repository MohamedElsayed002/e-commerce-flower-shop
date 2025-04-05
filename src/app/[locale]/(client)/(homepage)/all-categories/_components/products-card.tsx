import Image from "next/image";
import { ShoppingBag } from "lucide-react"
import { FaRegEye, FaRegHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaStar, FaRegStar } from "react-icons/fa"

// StarRating Component
const StarRating = ({ ratingAvg }: { ratingAvg: number }) => {
  const filledStars = Math.round(ratingAvg); // Round to the nearest whole number
  const emptyStars = 5 - filledStars; // The remaining stars to be empty

  return (
    <div className="flex">
      {/* Render filled stars */}
      {Array.from({ length: filledStars }).map((_, index) => (
        <FaStar key={`filled-${index}`} className="text-yellow-500" />
      ))}
      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-400" />
      ))}
    </div>
  );
};

export function ProductsCards({ item }: { item: Product }) {
  return (
    <div key={item._id} className="relative group w-fit">
      <div className="relative w-[400px] h-[400px] overflow-hidden rounded-md">
        {/* Product Image */}
        <Image
          alt={item.title}
          width={400}
          height={400}
          src={item.imgCover}
          className="block w-full h-full object-cover"
        />

        {/* Hover Component */}
        <div className="absolute inset-0 bg-custom-rose-900 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Search icon in center */}
        <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {/* TODO: View Product Button */}
          <Button className="bg-white text-2xl w-10 h-10 rounded-full flex justify-center items-center text-custom-rose-900  hover:bg-custom-rose-800">
            <FaRegEye />
          </Button>

          {/* TODO:Add to wishlist button */}
          <Button className="bg-white text-2xl w-10 h-10 rounded-full flex justify-center items-center text-custom-rose-900 hover:bg-custom-rose-800">
            <FaRegHeart />
          </Button>
        </div>

        {/* Badge */}
        <div className="absolute top-5 right-5">
          {item.quantity === 0 ? (
            <h1 className="text-sm bg-orange-400 p-2 rounded-md text-white">Out of Stock</h1>
          ) : (
            <h1 className="text-sm bg-purple-400 p-2 rounded-md text-white">New</h1>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          {/* Replace the previous star rating with the StarRating component */}
          <h2 className="text-xl">
            <StarRating ratingAvg={item.rateAvg ?? 0} />
          </h2>
          <h2 className="text-xl text-[#F05454]">${item.price}</h2>
        </div>
        <div className="mr-10 bg-violet-400 w-10 h-10 p-2 rounded-full flex items-center justify-center">
          <ShoppingBag className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
