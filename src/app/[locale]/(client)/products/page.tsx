import { Suspense } from "react";
import OccasionFilterWrapper from "./_components/filters/occasion-flter-wrapper";

export default async function ProductPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Suspense fallback={<div>Loading...</div>}>
        <OccasionFilterWrapper />
      </Suspense>
    </div>
  );
}
