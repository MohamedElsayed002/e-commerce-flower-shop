"use client";

import { cva } from "class-variance-authority";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const toasterVariants = cva(
    "group group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-lg",
    {
      variants: {
        variant: {
          default:
            "group-[.toaster]:bg-custom-gray-600 group-[.toaster]:text-custom-gray-300 group-[.toaster]:border-custom-gray-300 ",

          success:
            "group-[.toaster]:!bg-mint-green-70 group-[.toaster]:!border-mint-green-60 group-[.toaster]:text-custom-gray-300 success",

          error:
            "group-[.toaster]:!bg-custom-red-90 group-[.toaster]:!border-custom-red-80 group-[.toaster]:text-custom-gray-300",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: toasterVariants({ variant: "default" }),
          error: toasterVariants({ variant: "error" }),
          success: toasterVariants({ variant: "success" }),
          description: "group-[.toast]:text-red-50",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
