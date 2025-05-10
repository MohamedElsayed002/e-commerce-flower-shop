import { Skeleton } from "@/components/ui/skeleton";

export default function RevenueSkeleton() {
  return (
    <div className="space-y-6 mt-6 ms-4">
      {/* Chart skeleton */}
      <div className="flex gap-6">
        <Skeleton className="w-[276px] h-[381px] rounded-xl" />

        <Skeleton className="flex-1 h-[381px] rounded-xl" />
      </div>

      {/* Table skeletons */}
      <div className="flex gap-6">
        <Skeleton className="w-[536px] h-[300px] rounded-xl" />

        <Skeleton className="w-[536px] h-[300px] rounded-xl" />
      </div>
    </div>
  );
}
