import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      {children}

      {/* Footer */}
      <Footer />
    </>
  );
}
