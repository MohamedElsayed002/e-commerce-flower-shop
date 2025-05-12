import { useTranslations } from "next-intl";

// Custom tooltip component for the chart
export default function ChartTooltip({ active, payload, formatCurrency }: any) {
  // Translation
  const t = useTranslations();

  // Return nothing if tooltip is not active or there's no data
  if (!active || !payload || payload.length === 0) return null;

  // Extract the value from the payload
  const value = payload[0].value as number;

  return (
    <div className="bg-white p-2 rounded shadow text-sm text-custom-rose-900">
      {/* text */}
      <p>{t("revenue")}</p>

      {/* Formatted revenue value (EGP currency) */}
      <p>{formatCurrency(value)}</p>
    </div>
  );
}
