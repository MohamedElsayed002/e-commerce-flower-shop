"use client";

import { useGetAllStats } from "@/hooks/statistics/use-get-all-stats";
import { CircleDollarSign, NotepadText, Package, StickyNote } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { StatsComp } from "../common/stat-comp";
import { CategoriesSkeleton } from "../skeletons/stats/categories-skeleton";

export const AllStatsComp = () => {
  // Translations
  const t = useTranslations();

  // Mutation
  const { data, isPending, error } = useGetAllStats();

  // Formatter
  const format = useFormatter();

  const formattedNumber = format.number(data?.overall?.totalRevenue ?? 0, {
    style: "decimal",
  });

  // Loading
  if (isPending) return <CategoriesSkeleton />;

  // Error
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-5 gap-3 p-16 bg-white rounded-xl">

      {/* Stats comp total products */}
      <StatsComp
        icon={Package}
        color="#E32083"
        bgColor="#E320830D"
        value={data?.overall.totalProducts}
        text={t("total-products")}
      />

      {/* Stats comp total orders */}
      <StatsComp
        icon={NotepadText}
        color="#0063D0"
        bgColor="#0063D00D"
        value={data?.overall.totalOrders}
        text={t("total-orders")}
      />

      {/* Stats comp total categories */}
      <StatsComp
        icon={StickyNote}
        color="#753CBF"
        bgColor="#753CBF0D"
        value={data?.overall.totalCategories}
        text={t("total-categories")}
      />

      {/* Stats comp total revenue */}
      <StatsComp
        icon={CircleDollarSign}
        color="#008961"
        bgColor="#0089610D"
        value={formattedNumber}
        text={t("total-revenue")}
        currency={t('egp')}
      />
    </div>
  );
};
