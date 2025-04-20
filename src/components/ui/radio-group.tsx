<<<<<<< HEAD
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
=======
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"
>>>>>>> eb3b948a1ccb6a4b5d81c1f2409a6c9834e4b8f4

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
<<<<<<< HEAD
  const locale = useLocale();
  return (
    <RadioGroupPrimitive.Root
      dir={locale === "ar" ? "rtl" : "ltr"}
=======
  return (
    <RadioGroupPrimitive.Root
>>>>>>> eb3b948a1ccb6a4b5d81c1f2409a6c9834e4b8f4
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
<<<<<<< HEAD
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
=======
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName
>>>>>>> eb3b948a1ccb6a4b5d81c1f2409a6c9834e4b8f4

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
<<<<<<< HEAD
        "aspect-square h-4 w-4 rounded-full border border-blue-gray-500 shadow focus-visible:border-custom-rose-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-custom-rose-900 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center  text-custom-rose-900">
        <Circle className="h-3.5 w-3.5 fill-custom-rose-900" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
=======
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
>>>>>>> eb3b948a1ccb6a4b5d81c1f2409a6c9834e4b8f4
