"use client";

import { useGetAllOrders } from "@/hooks/statistics/use-get-all-orders";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { renderCustomizedLabel } from "./renderCustomizedLabel ";
import { CategoriesSkeleton } from "../skeletons/stats/categories-skeleton";
import { useTranslations } from "next-intl";

// Cutomized colors piechart
const customColors = ["#00A85F", "#197FD2", "#E93538"];

export function OrderStatus() {
  // Translations
  const t = useTranslations();

  // Mutate
  const { data, isPending, error } = useGetAllOrders();

  // Loading
  if (isPending) return <CategoriesSkeleton />;

  // Error
  if (error) return <h1>{error.message}</h1>;

  const rawOrders = data?.statistics.ordersByStatus || [];
  // Filter out null and pending statuses
  const filteredOrders = rawOrders.filter(
    (item: { _id: string | null }) => item._id !== null && item._id !== "pending",
  );

  // Total count
  const totalCount = filteredOrders.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0,
  );

  // Chart and footer data
  const chartData = filteredOrders.map(
    (item: { _id: string | null; count: number }, index: number) => {
      const percentage = Math.round((item.count / totalCount) * 100);
      return {
        status: item._id ?? "unknown",
        count: item.count,
        percentage,
        fill: customColors[index % customColors.length],
      };
    },
  );

  const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
    acc[item.status] = {
      label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col w-[276px] h-[381px] bg-white rounded-lg p-2">
      {/* Card header */}
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("orders-status")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          {/* Pie shape */}
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              innerRadius={50}
              outerRadius={85}
              labelLine={false}
              label={renderCustomizedLabel}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Footer */}
      <CardFooter className="grid gap-2">
        {chartData.map((item) => (
          <div key={item.status} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="capitalize">{item.status}</span>
            </div>
            <div className="text-muted-foreground font-medium">
              {item.count} ({item.percentage}%)
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
