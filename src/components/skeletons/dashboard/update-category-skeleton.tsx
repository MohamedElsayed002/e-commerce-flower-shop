import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateCategorySkeleton() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <Skeleton className="h-8 w-48 rounded-full bg-muted" />

      <Card className="w-full">
        <CardContent className="space-y-6 p-6">
          {/* Name field */}
          <div className="space-y-2 w-4/5">
            <Skeleton className="h-4 w-24 rounded-full bg-muted" />
            <Skeleton className="h-10 rounded-lg bg-muted/50" />
          </div>

          {/* Image button */}
          <div className="flex justify-end w-4/5">
            <Skeleton className="h-10 w-40 rounded-lg bg-muted/50" />
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-4/5 rounded-lg mt-8 bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
