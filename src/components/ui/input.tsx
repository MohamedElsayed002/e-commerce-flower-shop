"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const inputVariants = cva(
  "flex w-full  px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-shade-300 placeholder:font-light  focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-background",
        outline:
          "rounded-base-10 border border-custom-gray-100 placeholder:text-custom-gray-400  hover:border-custom-gray-500 text-custom-gray-300  disabled:bg-custom-gray-600 disabled:border-none focus:ring-1 focus:ring-custom-rose-900 focus:border-custom-rose-900",
      },
      state: {
        default: "",
        error: "border-custom-red-50 hover:border-red-50 focus:border-red-50",
      },
      inputSize: {
        default: "h-[50px] p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, state, placeholder = "Placeholder", ...props }, ref) => {
    if (type === "file") {
      return (
        <FileInput
          id={props.id}
          variant={variant}
          inputSize={inputSize}
          className={className}
          {...props}
        />
      );
    }

    if (type === "number") {
      return (
        <NumberInput
          ref={ref}
          variant={variant}
          inputSize={inputSize}
          state={state}
          className={className}
          placeholder={placeholder}
          {...props}
        />
      );
    }

    return (
      <div className="w-full relative">
        {type === "search" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-gray-400 pointer-events-none">
            <Search size={18} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, inputSize, state, className }),
            "w-full",
            type === "search" && "ps-10",
          )}
          ref={ref}
          {...props}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

// Handle file input
const FileInput = ({
  id,
  variant,
  inputSize,
  className,
  state,
  onChange,
  accept = "image/*",
  disabled,
}: InputProps) => {
  const [fileName, setFileName] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className={cn(
        inputVariants({ variant, inputSize, state, className }),
        "relative items-center",
      )}
    >
      {/* File */}
      <input
        title="file-uploder"
        type="file"
        id={id}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={accept}
        disabled={disabled}
      />

      {/* File name */}
      <span className="truncate text-sm text-custom-gray-70 max-w-[70%]">{fileName || ""}</span>

      {/* Icon , Text */}
      <div className="ml-auto flex items-center gap-1 pointer-events-none">
        <BsFileEarmarkArrowUp className="size-[18px] text-custom-gray-500" />
        <span className="text-sm text-custom-rose-900 font-medium">Upload file</span>
      </div>
    </div>
  );
};

// Handle number input
const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      state,
      placeholder,
      value,
      onChange,
      min,
      max,
      step = 1,
      disabled,
      ...props
    },
    ref,
  ) => {
    // State
    const [internalValue, setInternalValue] = React.useState<number | undefined>(
      value !== undefined ? Number(value) : undefined,
    );

    // Input ref
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merging
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Update value
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(Number(value));
      }
    }, [value]);

    // Increment
    const handleIncrement = () => {
      if (disabled) return;

      const currentValue = internalValue !== undefined ? internalValue : 0;
      const minValue = min !== undefined ? Number(min) : Number.MIN_SAFE_INTEGER;
      const maxValue = max !== undefined ? Number(max) : Number.MAX_SAFE_INTEGER;
      const stepValue = Number(step);
      const newValue = Math.min(currentValue + stepValue, maxValue);

      void minValue;

      if (newValue !== currentValue) {
        setInternalValue(newValue);

        // Onchange event
        if (onChange && inputRef.current) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(inputRef.current, newValue.toString());

            const event = new Event("input", { bubbles: true });
            inputRef.current.dispatchEvent(event);
          }
        }
      }
    };

    // Decrement
    const handleDecrement = () => {
      if (disabled) return;

      const currentValue = internalValue !== undefined ? internalValue : 0;
      const minValue = min !== undefined ? Number(min) : Number.MIN_SAFE_INTEGER;
      const stepValue = Number(step);

      const newValue = Math.max(currentValue - stepValue, minValue);

      if (newValue !== currentValue) {
        setInternalValue(newValue);

        // Onchange event
        if (onChange && inputRef.current) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(inputRef.current, newValue.toString());

            const event = new Event("input", { bubbles: true });
            inputRef.current.dispatchEvent(event);
          }
        }
      }
    };

    // Input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value === "" ? undefined : Number(e.target.value);
      setInternalValue(newValue);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative w-full">
        {/* Number */}
        <input
          type="number"
          className={cn(
            inputVariants({ variant, inputSize, state, className }),
            "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-10",
          )}
          ref={inputRef}
          placeholder={placeholder}
          value={internalValue !== undefined ? internalValue : ""}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...props}
        />

        {/* Arrows */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
          <button
            title="increment"
            type="button"
            className={cn(
              "flex items-center justify-center text-custom-gray-500 hover:text-custom-gray-700 focus:outline-none",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            onClick={handleIncrement}
            disabled={disabled}
            tabIndex={-1}
          >
            <ChevronUp size={15} />
          </button>
          <button
            title="decrement"
            type="button"
            className={cn(
              "flex items-center justify-center text-custom-gray-500 hover:text-custom-gray-700 focus:outline-none ",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            onClick={handleDecrement}
            disabled={disabled}
            tabIndex={-1}
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
