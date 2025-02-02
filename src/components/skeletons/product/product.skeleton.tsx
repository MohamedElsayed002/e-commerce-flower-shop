import SkeletonBar from "@/components/common/skeleton-bar";
import SkeletonSquare from "@/components/common/skeleton-square";

export default function ProductSkeleton(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={`p-4 bg-white rounded-lg shadow-md flex flex-col gap-2 w-72 ${
        props.className || ""
      }`}
    >
      <SkeletonSquare className="h-32 w-[100%]" />
      <SkeletonBar className="h-4 w-40" />
      <SkeletonBar className="h-4 w-24" />
    </div>
  );
}
