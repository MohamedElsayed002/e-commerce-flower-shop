import { fetchOccasions } from "@/lib/apis/occasion.api";
import OccasionFilter from "./occasion-filter";
import { getTranslations } from "next-intl/server";

export default async function OccasionFilterWrapper() {
  // Translation
  const t = await getTranslations();
  // Fetch occasions
  const occasionsData = await fetchOccasions();
  if (!occasionsData) {
    return <div> {t("error-occasions")}</div>;
  }

  return <OccasionFilter occasions={occasionsData?.occasions ?? []} />;
}
