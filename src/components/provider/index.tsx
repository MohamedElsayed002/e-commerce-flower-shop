
import { NextIntlClientProvider, useMessages } from "next-intl";
// import NextAuthProvider from "./components/next-auth-provider";
import ReactQueryProvider from "./components/react-query-provider";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // Translation
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* <NextAuthProvider>
      </NextAuthProvider> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster/>
    </NextIntlClientProvider>
  );
}
