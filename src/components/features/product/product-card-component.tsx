import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { BsHandbag } from "react-icons/bs";
import { FaRegEye, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa6";
import { useFormatter } from "next-intl";
import { Link } from "@/i18n/routing";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Translation
  const format = useFormatter();

  return (
    <Card className="rounded-[20px]" key={product.id}>
      {/* Card header */}
      <CardHeader className="group min-h-60 bg-main-color rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative">
        {/* Image overlay */}
        <div className="absolute inset-0 bg-custom-rose-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>

        {/* Product image */}
        <Image
          src={product.imgCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 222px"
          className="object-cover group-hover:opacity-70 transition-opacity duration-300"
        />

        {/* Action buttons */}
        <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {/* TODO: View Product Button */}
          <Button className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800">
            <FaRegEye />
          </Button>

          {/* TODO:Add to wishlist button */}
          <Button className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800">
            <FaRegHeart />
          </Button>
        </div>
      </CardHeader>

      {/* Product details */}
      <CardContent className="px-4">
        <Link href={`/products/${product._id}`} className="flex justify-between items-center">
          {/* Product information */}
          <div className="flex flex-col justify-start gap-[9px]">
            {/* Product title */}
            <h6 className="text-start text-[17px] font-semibold text-blue-gray-900 font-inter line-clamp-1">
              {product.title}
            </h6>

            {/* TODO: Product rating */}
            <div className="flex text-rate-color">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < (product?.rating || 4) ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>

            {/* Product price */}
            <p className="text-base text-flamingo font-medium text-start font-roboto">
              {/* Formatting price */}
              {format.number(product.priceAfterDiscount || product.price, {
                style: "currency",
                currency: "USD",
              })}{" "}
              {/* Display discounted price if available */}
              {product.priceAfterDiscount && (
                <span className="line-through text-blue-gray-50">
                  {format.number(product.price, {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              )}
            </p>
          </div>

          {/* TODO:Add to cart button */}
          <Button className="text-white bg-custom-purple-900 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-custom-purple-800">
            <BsHandbag />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
