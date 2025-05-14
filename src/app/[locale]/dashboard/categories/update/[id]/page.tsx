import { Suspense } from "react";
import UpdateCategorySkeleton from "@/components/skeletons/dashboard/update-category-skeleton";
import UpdateCategoryWrapper from "../_components/update-category-wrapper";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<UpdateCategorySkeleton />}>
        <UpdateCategoryWrapper params={params} />
      </Suspense>
    </>
  );
}
