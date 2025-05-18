import React from "react";
import UpdateProductform from "./_components/update-product-form";
import { fetchProductDetails } from "@/lib/apis/product.api";
import { fetchCategories } from "@/lib/apis/category.api";
import ProductForm from "./_components/add-product-form";

export default async function ProductsPage({ params }: { params: { id: string } }) {
  const data = await fetchProductDetails("67d727af836ee8be706225dc");
  const categoriesdata = await fetchCategories();
  console.log("data", data);
  console.log(" CAT", categoriesdata);
  return (
    <div>
       {/* <ProductForm />  */}
      <UpdateProductform
        params={{ id: params.id }}
        product={data?.product}
        categories={categoriesdata?.categories || []}
      />
    </div>
  );
}
