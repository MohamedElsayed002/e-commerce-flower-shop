

import ProductCard from '@/components/features/product/product-card-component';
import fetchProductsByCategory from '@/lib/apis/product-details.api';
import React, { useEffect, useState } from 'react'
type TProps = {
    
        category: string; 
    
  };

//   export const fetchRelatedProducts = async (categoryId: string) => {
//     try {
//       // Send request to fetch related products (limit to 4)
//       const apiUrl = `${process.env.API_BASE_URL}/products?category=${categoryId}`;
//       const res = await fetch(apiUrl);
  
//       // If the response is not successful, throw an error
//       if (!res.ok) throw new Error("Failed to fetch related products");
  
//       // Parse the response JSON
//       const data = await res.json();
//       console.log("related",data)
//       return data.data; // Assuming the products array is inside `data.data`
//     } catch (error) {
//       // Return null in case of an error
//       return null;
//     }
//   };
export default async function Relateditems({category}: TProps) {
    // const [products, setProducts] = useState(null);
    const categoryId = category
    console.log(categoryId)
   
   
    
    const products = await fetchProductsByCategory(categoryId);
  console.log("Ptoducts", products);
  
   
    //  console.log("component",data)
  return (
    <>
    
 <div className="grid grid-cols-4 gap-6 justify-start">
      {/* Show a "Coming Soon" message if no products are available */}
      {products.length === 0 ? (
        <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900">
         
        </div>
      ) : (
      
        products.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))
      )}
      </div>

    </>
    

  )
}



