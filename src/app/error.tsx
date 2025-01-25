"use client";


export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
        <body>
            <main >
                {error.message}
                <button className="mt-8" onClick={reset}>
                Try again
                </button>
            </main>
        </body>
    </html>
  );
}