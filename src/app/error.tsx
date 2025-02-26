"use client";

import ErrorComponent from "@/components/common/error-component";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {/* Error Message */}
      <ErrorComponent>{error.message}</ErrorComponent>

      {/* Try again*/}
      <button className="mt-8" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
