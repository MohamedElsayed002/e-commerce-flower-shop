import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api";
import RevenueChart from "./_components/revenue";
import TopSellingProducts from "./_components/revenue/top-selling-products";
import LowStockProducts from "./_components/revenue/low-stock-products";
import { OrderStatus } from "./_components/revenue/order-status";
import { AllStatsComp } from "./_components/revenue/all-stats-comp";
import { AllCategories } from "./_components/revenue/all-categories";

export default async function Overview() {
  // Function
  const statistics = await getAllStatistics();

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <AllStatsComp />
        <AllCategories />
      </div>

      <div className="flex gap-6 mt-6 w-full">
        <div className="min-w-[276px]">
          {/* order statue */}
          <OrderStatus />
        </div>
        <div className="flex-1">
          {/* Revenue chart */}
          <RevenueChart
            dailyRevenue={statistics.orders.dailyRevenue || []}
            monthlyRevenue={statistics.orders.monthlyRevenue || []}
          />
        </div>
      </div>

      <div className="flex justify-between gap-6 mt-6 ">
        {/* Top-selling products */}
        <TopSellingProducts topSellingProducts={statistics.products.topSellingProducts || []} />

        {/* Low-stock products */}
        <LowStockProducts lowStockProducts={statistics.products.lowStockProducts || []} />
      </div>
    </div>
  );
}
