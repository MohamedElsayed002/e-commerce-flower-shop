"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="h-screen flex-col flex gap-12">
          {/* Headline */}
          <h1 className="text-9xl font-bold text-red-600">ERROR!</h1>

          {/* Error Message */}
          <p>{error.message}</p>

          {/* Try again Button */}
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
