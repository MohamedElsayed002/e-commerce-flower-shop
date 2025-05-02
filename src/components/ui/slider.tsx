"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>((props, ref) => {
  const { className, ...rest } = props;
  const locale = useLocale();

  return (
    <SliderPrimitive.Root
      dir={locale === "ar" ? "rtl" : "ltr"}
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...rest}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-blue-gray-500">
        <SliderPrimitive.Range className="absolute h-full bg-custom-rose-900" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="bg-custom-rose-900 block h-4 w-4 rounded-full border border-white bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      <SliderPrimitive.Thumb className="bg-custom-rose-900 block h-4 w-4 rounded-full border border-white bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
