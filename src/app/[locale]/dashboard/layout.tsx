import Sidebar from "@/components/layout/dashboard/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      {children}
    </div>
  );
}
