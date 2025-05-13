import Header from "@/components/layout/dashboard/header";
import Sidebar from "@/components/layout/dashboard/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className=" w-full ml-72 rtl:ml-0 rtl:mr-72">
        {/*  Header */}
        <Header />

        {/* Content */}
        <div className="bg-custom-white px-4 py-7">{children}</div>
      </div>
    </div>
  );
}
