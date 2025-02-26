import SkeletonBar from "@/components/common/skeleton-bar";
import SkeletonCircle from "@/components/common/skeleton-circle";
import SkeletonSquare from "@/components/common/skeleton-square";
import { cn } from "@/lib/utils/cn";

export default function ProductSkeleton(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn("bg-zinc-100 rounded-xl flex flex-col gap-3 w-[262px] ", props.className)}
    >
      {/* Product Image Skeleton */}
      <SkeletonSquare className="h-[250px] w-full rounded-xl" />

      {/* Info Section - Two Columns */}
      <div className="flex items-center justify-between p-4 ">
        <div className="flex flex-col gap-3">
          {/* Product Name */}
          <SkeletonBar className="h-5 w-40" />

          {/* Rating */}
          <SkeletonBar className="h-4 w-28" />

          {/* Price */}
          <SkeletonBar className="h-5 w-40" />
        </div>
        <SkeletonCircle className="w-10 h-10 bg-gray-300" /> {/* Cart Button */}
      </div>
    </div>
  );
}
