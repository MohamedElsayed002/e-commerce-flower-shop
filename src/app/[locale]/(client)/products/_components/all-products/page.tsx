// import { useTranslations } from "next-intl";
// import { searchParamsToString } from "@/lib/utils/convert-search-params";
// import { getTranslations } from "next-intl/server";
// import ProductCard from "@/components/features/product/product-card-component";
// import { Suspense } from "react";
// import Products from "./products";
// import ProductSkeleton from "@/components/skeletons/product/product.skeleton";

// export default async function AllCategoriesPage({ searchParams }: RouteProps) {
//   // Translation
//   const t = getTranslations();

//   return (
//     <div className="p-10 grid grid-cols-1 md:grid-cols-[1fr_4fr] container">

//       {/* Status Filter */}
//       <div></div>

//       {/* Products */}
//       <Suspense
//         fallback={
//           <div className=" grid grid-cols-1 md:grid-cols-3">
//             <ProductSkeleton />
//             <ProductSkeleton />
//             <ProductSkeleton />
//           </div>
//         }
//       >
//         <Products searchParams={searchParams} />
//       </Suspense>
//     </div>
//   );
// }
