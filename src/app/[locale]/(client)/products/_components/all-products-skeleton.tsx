import ProductSkeleton from "@/components/skeletons/product/product.skeleton";

export default function AllProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}
