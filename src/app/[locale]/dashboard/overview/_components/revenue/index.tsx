"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { useTranslations } from "next-intl";

type RevenueChartProps = {
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

export default function RevenueChart({ dailyRevenue, monthlyRevenue }: RevenueChartProps) {
  // Translation
  const t = useTranslations();

  // State
  const [isMonthly, setIsMonthly] = useState(true);

  // Format the month name from a date string
  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  };

  // Format number as currency (EGP) without decimal places
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-EG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component to show value on hover
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const value = payload[0].value as number;

    return (
      <div className="bg-white p-2 rounded shadow text-sm text-custom-rose-900">
        <p>{t("revenue")}</p>
        <p>{formatCurrency(value)}</p>
      </div>
    );
  };

  // Get the relevant dataset based on toggle (monthly or weekly)
  const data = (isMonthly ? monthlyRevenue : dailyRevenue).map((entry) => ({
    name: formatMonth(entry._id),
    value: entry.revenue,
  }));

  // Find the highest revenue value for dot highlighting
  const maxValue = Math.max(...data.map((d) => d.value));

  // Custom dot to highlight the max value point
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.value !== maxValue) return null;

    return (
      <>
        <circle cx={cx} cy={cy} r={6} fill="#ec4899" stroke="#fff" strokeWidth={2} />
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#ec4899" fontWeight="bold" fontSize={12}>
          {formatCurrency(payload.value)}
        </text>
      </>
    );
  };

  return (
    <div>
      <Card>
        <CardContent className="shadow-md rounded-xl bg-white w-[796px] h-[381px] ">
          <div className="flex justify-between items-center">
            {/* Text */}
            <h2 className="text-lg font-semibold">{t("revenue")}</h2>
            <div className="text-sm">
              {/* Button */}
              <button
                onClick={() => setIsMonthly(true)}
                className={`mr-2 ${isMonthly ? "text-custom-rose-900 font-bold" : "text-gray-400"}`}
              >
                {t("monthly")}
              </button>

              {/* Button */}
              <button
                onClick={() => setIsMonthly(false)}
                className={`mr-2 ${!isMonthly ? "text-custom-rose-900 font-bold " : "text-gray-400"}`}
              >
                {t("last-week")}
              </button>
            </div>
          </div>

          <div dir="ltr">
            <ResponsiveContainer width="100%" height={315}>
              <AreaChart data={data} margin={{ top: 30, right: 50, left: 25, bottom: 0 }}>
                <CartesianGrid vertical={true} horizontal={false} />

                {/* Y-axis */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatCurrency}
                  fontSize={12}
                  orientation="left"
                  className="font-bold"
                />

                {/* X-axis */}
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  className="font-bold"
                />

                {/* Tooltip on hover */}
                <Tooltip content={<CustomTooltip />} />

                {/* Area */}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ec4899"
                  fill="url(#custom-rose-900)"
                  strokeWidth={2}
                  dot={<CustomDot />}
                />

                {/* Linear gradient */}
                <defs>
                  <linearGradient id="custom-rose-900" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
