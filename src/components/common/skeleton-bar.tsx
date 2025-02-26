import { cn } from "@/lib/utils/cn";

export default function SkeletonBar(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn("h-4 w-full bg-gray-300 animate-pulse rounded-md ", props.className)}
    />
  );
}
