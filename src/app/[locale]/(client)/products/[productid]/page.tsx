import { fetchProductDetails } from "@/lib/apis/product.api";
import Content from "./_components/product-details/product-content/_components/content";
import RelatedItems from "./_components/product-details/related-items";
import ProductCarousel from "./_components/product-details/product-content/_components/product-carousel";

type TProps = {
  params: {
    productid: string;
    product: Product;
  };
};

// The main product page component
export default async function ProductPage({ params }: TProps) {
  // Extract product ID variable
  const { productid } = params;

  // Function
  const data = await fetchProductDetails(productid);

  // Handling error
  if (!data) throw new Error("Product not found");

  // Variable
  const catogeryid = data.product.category;

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-[40px] py-20">
        {/* Product carousel */}
        <ProductCarousel product={data?.product || []} />

        {/* Product details content */}
        <Content product={data.product} />
      </div>

      {/* Related items */}
      <div className="container m-auto flex gap-[40px] py-20">
        <RelatedItems category={catogeryid} productid={productid} />
      </div>
    </div>
  );
}
