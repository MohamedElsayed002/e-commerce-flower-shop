"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    // <Sonner
    //   theme={theme as ToasterProps["theme"]}
    //   className="toaster group"
    //   toastOptions={{
    //     classNames: {
    //       toast:
    //         "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
    //       description: "group-[.toast]:text-muted-foreground",
    //       actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
    //       cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
    //       success: "border:mint-green-60 bg-mint-green-70 text-custom-gray-300",
    //     },
    //   }}
    //   {...props}
    // /> 
    <Sonner
  theme={theme as ToasterProps["theme"]}
  className="toaster group"
  toastOptions={{
    classNames: {
      toast: [
        "group toast group-[.toaster]:shadow-lg group-[.toaster]:text-foreground group-[.toaster]:border-border",
        "group-[.toaster]:bg-background",
        "data-[type=success]:border-mint-green-60 data-[type=success]:bg-mint-green-70 data-[type=success]:text-custom-gray-300",
        "data-[type=error]:border-red-500 data-[type=error]:bg-red-50 data-[type=error]:text-red-800",
      ].join(" "),
      description: "group-[.toast]:text-muted-foreground",
      actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
    },
  }}
  {...props}
/>

  );
};

export { Toaster };
