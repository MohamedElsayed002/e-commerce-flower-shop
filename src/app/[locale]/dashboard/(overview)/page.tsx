import { Suspense } from "react";
import Overview from "./overview";
import RevenueSkeleton from "./_components/revenue/revenue-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<RevenueSkeleton />}>
      <Overview />
    </Suspense>
  );
}
