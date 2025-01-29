export default function SkeletonBar(props: SkeletonProps) {
  return (
    <div
      {...props}
      className={`h-4 w-full bg-gray-300 animate-pulse rounded-md ${props.className || ""}`}
    />
  );
}
