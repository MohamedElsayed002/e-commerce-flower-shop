import SkeletonBar from "@/components/common/skeleton-bar";
import SkeletonCircle from "@/components/common/skeleton-circle";
import { cn } from "@/lib/utils/cn";

export default function CategorySkeleton(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-4 p-4 bg-zinc-50 rounded-[20px]  w-56 h-[122px] ",
        props.className
      )}
    >
      {/* Left Column: Circle */}
      <SkeletonCircle className="h-[90px] w-[90px]" />

      {/* Right Column: Bars */}
      <div className="flex flex-col gap-3 flex-1">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-[80%]" />
      </div>
    </div>
  );
}
