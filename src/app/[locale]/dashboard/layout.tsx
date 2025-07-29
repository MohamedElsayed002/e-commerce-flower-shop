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
        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
