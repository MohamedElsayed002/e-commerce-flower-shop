import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-custom-rose-900 text-primary-foreground hover:bg-custom-rose-60  disabled:bg-custom-gray-200",
        destructive:
          "bg-custom-red-60 text-destructive-foreground hover:bg-custom-red-70  disabled:bg-custom-gray-200 ",
        outline:
          "border border-custom-rose-900  hover:bg-custom-rose-70 disabled:bg-custom-gray-700 disabled:border-custom-gray-800 rounded-[10px] text-custom-rose-900",
        secondary:
          "bg-custom-gray-900 text-custom-gray-70 border border-custom-gray-60 hover:bg-custom-gray-80 hover:text-custom-gray-90 disabled:bg-custom-gray-40 disabled:border-custom-gray-30 disabled:text-custom-gray-90 ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      status: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      status: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, children = "button", asChild = false, ...props },
    ref,
  ) => {
    // Loading case
    void loading;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}

        {/* Loading icon */}
        {loading && <Loader2 size={18} className="animate-spin" />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
