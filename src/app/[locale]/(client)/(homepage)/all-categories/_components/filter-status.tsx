"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FilterStatus() {
  // Translation
  const t = useTranslations();

  // Router and Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get selected statuses from URL, convert to an array
  const initialStatuses = searchParams.get("status")?.split(",") || [];
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialStatuses);

  const handleStatusChange = (status: string) => {
    let updatedStatuses = [...selectedStatuses];

    if (updatedStatuses.includes(status)) {
      updatedStatuses = updatedStatuses.filter((item) => item !== status);
    } else {
      updatedStatuses.push(status);
    }

    setSelectedStatuses(updatedStatuses);

    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (updatedStatuses.length > 0) {
      params.set("status", updatedStatuses.join(","));
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-2 p-5 rounded-md shadow-md">
      {/* Title */}
      <h1>{t("status")}</h1>
      <Separator className="bg-black mt-2" />
      <div className="flex gap-y-3 mt-3 flex-col">
        {/* Status array to Show */}
        {["on-sale", "in-stock"].map((status) => (
          <div key={status} className="flex gap-4">
            <Checkbox
              id={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => handleStatusChange(status)}
            />
            <label htmlFor={status} className="text-sm font-medium leading-none">
              {t(status)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
