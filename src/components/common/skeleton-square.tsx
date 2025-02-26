import { cn } from "@/lib/utils/cn";

export default function SkeletonSquare(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn("h-10 w-10 bg-gray-300 animate-pulse rounded-md ", props.className)}
    />
  );
}
