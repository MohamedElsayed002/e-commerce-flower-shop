"use client";

import ArrowLeft from "@/components/common/arrow-long-left";
import ArrowRight from "@/components/common/arrow-right";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";

export default function CatButton() {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto py-2 px-4">
      <div className="border-2 border-custom-rose-900 rounded-2xl p-4">
        <div className="flex justify-between">
          <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.back()}>
            <ArrowLeft /> Previous
          </Button>
          <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.push("/paymant")}>
            Pay Now <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
