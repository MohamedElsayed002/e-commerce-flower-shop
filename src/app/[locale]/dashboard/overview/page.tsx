import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api";
import RevenueChart from "./_components/revenue";
import TopSellingProducts from "./_components/revenue/top-selling-products";
import LowStockProducts from "./_components/revenue/low-stock-products";

export default async function Page() {
  // Function
  const statistics = await getAllStatistics();

  return (
    <div>
      <div className="flex gap-6 mt-6">
        {/* Placeholder for overview card (waiting for merger with overview-A) */}
        <div className="w-[276px] h-[381px] bg-white rounded-xl shadow-md ms-4"></div>

        {/* Revenue chart */}
        <RevenueChart
          dailyRevenue={statistics.orders.dailyRevenue || []}
          monthlyRevenue={statistics.orders.monthlyRevenue || []}
        />
      </div>

      <div className="flex gap-6 mt-6">
        {/* Top-selling products */}
        <TopSellingProducts topSellingProducts={statistics.products.topSellingProducts || []} />

        {/* Low-stock products */}
        <LowStockProducts lowStockProducts={statistics.products.lowStockProducts || []} />
      </div>
    </div>
  );
}
