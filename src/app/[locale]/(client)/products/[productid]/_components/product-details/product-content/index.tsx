import React from "react";
import Content from "./_components/content";
import QuantitySelector from "./_components/quantity-selector";

// Type
type Productprops = {
  product: Product;
  maxQuantity: number;
  productid: string;
};

export default function index({ product, maxQuantity, productid }: Productprops) {
  return (
    <>
      {/*  Product content */}
      <Content product={product} />

      {/* Quantity selector  */}
      <QuantitySelector maxQuantity={maxQuantity} productid={productid} />
    </>
  );
}
