import SkeletonBar from "@/components/common/skeleton-bar";
import SkeletonCircle from "@/components/common/skeleton-circle";

export default function CategorySkeleton(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-48 ${
        props.className || ""
      }`}
    >
      {/* Left Column: Circle */}
      <SkeletonCircle className="h-16 w-16" />

      {/* Right Column: Bars */}
      <div className="flex flex-col gap-2 flex-1">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-3/4" />
      </div>
    </div>
  );
}
