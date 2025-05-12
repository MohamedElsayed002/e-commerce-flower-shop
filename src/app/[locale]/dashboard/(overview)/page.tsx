import { Suspense } from "react";
import Overview from "./overview";

export default function Page() {
  return (
    <Suspense fallback={<div>Loadin...</div>}>
      <Overview />
    </Suspense>
  );
}
