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
        <main>
          {/* Error Message*/}
          ERROR! {error.message}
          {/* Try again Button*/}
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
