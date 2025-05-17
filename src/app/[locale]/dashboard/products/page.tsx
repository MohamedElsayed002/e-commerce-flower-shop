import React from "react";
import UpdateProductform from "./_components/update-product-form";
import { fetchProductDetails } from "@/lib/apis/product.api";

export default async function ProductsPage({ params }: { params: { id: string } }) {

  const data=await fetchProductDetails('673e308c115992017182816d')
  console.log("data",data)
  return <>
   {/* <ProductForm /> */}
   <UpdateProductform params={{ id: params.id }} product={data?.product} images={[]} />

  
  </>
  
}
