// components/order-status-chart.tsx
"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { renderCustomizedLabel } from "./renderCustomizedLabel ";
import { useTranslations } from "next-intl";

export function OrderStatusChart({
  data,
}: {
  data: {
    status: string;
    count: number;
    percentage: number;
    fill: string;
  }[];
}) {
  // Translations
  const t = useTranslations();

  const chartConfig: ChartConfig = data.reduce((acc, item) => {
    acc[item.status] = {
      label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="grid grid-cols-1 w-[276px] h-[381px] bg-white shadow-md rounded-lg p-2">
      <CardHeader className="items-center pb-0 text-2xl">
        <CardTitle>{t("orders-status")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
            <Pie
              data={data}
              dataKey="count"
              innerRadius={50}
              outerRadius={85}
              labelLine={false}
              label={renderCustomizedLabel}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-2">
        {data.map((item) => (
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
