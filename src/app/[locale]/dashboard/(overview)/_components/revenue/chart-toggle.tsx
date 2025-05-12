import { useTranslations } from "next-intl";

// Toggle component to switch between monthly and weekly chart views
export default function ChartToggle({
  isMonthly,
  setIsMonthly,
}: {
  isMonthly: boolean;
  setIsMonthly: (val: boolean) => void;
}) {
  // Translation
  const t = useTranslations();

  return (
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
        className={`mr-2 ${!isMonthly ? "text-custom-rose-900 font-bold" : "text-gray-400"}`}
      >
        {t("last-week")}
      </button>
    </div>
  );
}
