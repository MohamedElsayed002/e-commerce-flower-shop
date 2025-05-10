import { Suspense } from "react";
import Overview from "./overview";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4"></div>}>
      <Overview />
    </Suspense>
  );
}
