import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Main content */}
      {children}

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
}
