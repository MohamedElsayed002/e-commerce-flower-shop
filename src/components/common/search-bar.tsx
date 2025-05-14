"use client";

import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function SearchBar({placeholder}: { placeholder?: string }) {

  // Translations
  const t = useTranslations()

  // Params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // State
  const [search, setSearch] = useState(searchParams.get("search")?.toString() || "");

  // Functions
  
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className="relative w-full border rounded-md mt-5">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={t(placeholder)}
        className="w-full pl-10 rounded-md"
      />
    </div>
  );
}
