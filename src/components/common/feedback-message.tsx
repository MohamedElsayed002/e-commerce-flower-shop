import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

type FeedbackMessageProps = {
  message?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export default function FeedbackMessage({ message, className, ...props }: FeedbackMessageProps) {
  if (!message) return null;

  return (
    <p
      {...props}
      className={cn(
        "text-center text-red-500 flex items-center gap-1 text-sm font-medium my-1",
        className,
      )}
    >
      <Info size={18} /> {message}
    </p>
  );
}
