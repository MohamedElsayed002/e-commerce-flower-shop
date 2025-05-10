import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareavariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm   disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "border border-custom-gray-100 placeholder:text-custom-gray-400 focus:outline-none focus:ring-1 focus:ring-custom-rose-900 focus:border-custom-rose-900 text-custom-gray-300  disabled:bg-custom-gray-600  focus:ring-1  rounded-base-10 hover:border-custom-gray-500 ",
      },
      status: {
        default: "",
        error:
          "focus:outline-none focus:ring-1 focus:ring-custom-red-50 focus:border-custom-red-50",
      },
    },

    defaultVariants: {
      variant: "default",
      status: "default",
    },
  },
);

type TextareaProps = React.ComponentProps<"textarea"> & VariantProps<typeof textareavariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, status, ...props }, ref) => {
    return (
      <textarea
        className={cn("", textareavariants({ variant, status }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
