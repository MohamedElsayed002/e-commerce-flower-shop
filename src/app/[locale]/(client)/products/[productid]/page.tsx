import { fetchProductDetails } from "@/lib/apis/product-details.api";
import ProductCarousel from "./_components/product-details/product-carousel";

type TProps = {
  params: {
    productid: string;
  };
};

// The main product page component
export default async function ProductPage({ params }: TProps) {
  // Extract product ID variable
  const { productid } = params;

  // Function
  const payload = await fetchProductDetails(productid);
  const catogeryid = payload.product.category;
  console.log("catId", catogeryid);

  // Handling error
  if (!payload) throw new Error("Product not found");

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-[40px] py-20">
        {/* Product image carousel */}
        <ProductCarousel product={payload?.product || []} />
      </div>
    </div>
  );
}
