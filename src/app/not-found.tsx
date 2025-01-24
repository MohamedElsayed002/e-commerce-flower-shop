import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <html>
      <body>
        <main className="h-screen flex flex-col gap-12">
          {/* Headline */}
          <h1 className="text-9xl font-bold text-red-600">404 not found :(</h1>

          {/* Homepage link */}
          <Link href="/">Go back to homepage</Link>
        </main>
      </body>
    </html>
  );
}
