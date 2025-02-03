import SkeletonBar from "@/components/common/skeleton-bar";
import SkeletonCircle from "@/components/common/skeleton-circle";
import SkeletonSquare from "@/components/common/skeleton-square";

export default function ProductSkeleton(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={`bg-white rounded-xl flex flex-col gap-3 w-[262px]  ${props.className || ""}`}
    >
      {/* Product Image Skeleton */}
      <SkeletonSquare className="h-[240px] w-full rounded-xl" />

      {/* Info Section - Two Columns */}
      <div className="flex items-center justify-between p-3 ">
        <div className="flex flex-col gap-3">
          <SkeletonBar className="h-5 w-40" /> {/* Product Name */}
          <SkeletonBar className="h-4 w-28" /> {/* Rating */}
          <SkeletonBar className="h-5 w-40" /> {/* Price */}
        </div>
        <SkeletonCircle className="w-10 h-10 bg-gray-300" /> {/* Cart Button */}
      </div>
    </div>
  );
}
