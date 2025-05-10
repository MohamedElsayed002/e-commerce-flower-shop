import { CategoriesSkeleton } from "@/components/skeletons/stats/categories-skeleton";
import { AllCategories } from "@/components/stats/all-categories";
import { AllStatsComp } from "@/components/stats/all-stats-comp";
import { OrderStatus } from "@/components/stats/order-status";
import React from "react";
import { Suspense } from "react";

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Suspense fallback={<CategoriesSkeleton />}>
        <AllStatsComp />
      </Suspense>
      <Suspense fallback={<CategoriesSkeleton />}>
        <AllCategories />
      </Suspense>
      <Suspense fallback={<CategoriesSkeleton />}>
        <OrderStatus />
      </Suspense>
    </div>
  );
}
