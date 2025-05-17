import React from "react";
import UpdateProductform from "./_components/update-product-form";
import { fetchProductDetails } from "@/lib/apis/product.api";
import { fetchCategories } from "@/lib/apis/category.api";

export default async function ProductsPage({ params }: { params: { id: string } }) {

  const data=await fetchProductDetails('673e308c115992017182816d')
  const categories =await fetchCategories()
  console.log("data",data)
  // console.log(' CAT',categories)
  return <>
   {/* <ProductForm /> */}
   <UpdateProductform   params={{ id: params.id }} product={data?.product} categories={data.categories ||[]}  />
  </>
  
}
