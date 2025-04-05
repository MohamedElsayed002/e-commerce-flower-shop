import { fetchProductDetails } from "@/lib/apis/product-details.api";
import Productcarousel from "./_components/product-details/product-carousel";
import Content from "./_components/product-details/product-content";
import Relateditems from "./_components/related-items";

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
  const catogeryid = data.product.category;
  console.log("catId", catogeryid);

  // Handling error
  if (!data) throw new Error("Product not found");

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-[40px] py-20">
        {/* Product image carousel */}
        <Productcarousel product={data} />

        {/* Product details content */}
        <Content product={data} />
      </div>
      {/* Related items */}
      <div className="container m-auto flex gap-[40px] py-20">
        <Relateditems category={catogeryid} />
      </div>
    </div>
  );
}
