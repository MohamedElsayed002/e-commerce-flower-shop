import { fetchProductDetails } from "@/lib/apis/product.api";
import Productcarousel from "./_components/product-details/product-carousel";
import Content from "./_components/product-details/product-content";
import Relateditems from "./_components/related-items/related-items";

// Type
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
  const data = await fetchProductDetails(productid);

  // Variable
  const catogeryid = data.product.category;

  // Handling error
  if (!data) throw new Error("Product not found");

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-[40px] py-20">
        {/* Product image carousel */}
        <Productcarousel product={data.product} />

        {/* Product details content */}
        <Content product={data.product} />
      </div>

      {/* Related items */}
      <div className="container m-auto flex gap-[40px] py-20">
        <Relateditems category={catogeryid} />
      </div>
    </div>
  );
}
