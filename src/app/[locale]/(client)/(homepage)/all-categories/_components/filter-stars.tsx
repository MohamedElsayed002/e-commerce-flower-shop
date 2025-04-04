"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function FilterStars() {

    // Translation
    const t = useTranslations()

    // Router and SearchParams
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // State
    const [selected, setSelected] = useState<string | null>(searchParams.get("rating") || null);

    // Function
    const handleChange = (id: string) => {
        const newRating = id === selected ? null : id; // Uncheck if clicking the same one again
        setSelected(newRating);

        // Update the URL query parameters
        const params = new URLSearchParams(window.location.search);
        
        if (newRating) {
            params.set("rating", newRating);
        } else {
            params.delete("rating");
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mb-2 p-5 rounded-md shadow-md">
            <h1>{t('rating')}</h1>
            <Separator className="bg-black mt-2" />
            <div className="flex gap-y-3 mt-3 flex-col">
                {["5", "4", "3", "2", "1"].map((id, index) => (
                    <div key={id} className="flex gap-4">
                        <Checkbox
                            id={id}
                            checked={selected === id}
                            onCheckedChange={() => handleChange(id)}
                        />
                        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {"⭐".repeat(5 - index)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
