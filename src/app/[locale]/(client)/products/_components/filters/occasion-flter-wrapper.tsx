import { getTranslations } from "next-intl/server";
import OccasionFilter from "./occasion-filter";

//  Function fetch occasions
async function fetchOccasion() {
  const response = await fetch(`${process.env.API}/occasions`, {
    method: "GET",
    cache: "no-store",
  });
  const payload: APIResponse<PaginatedResponse<{ occasions: Occasion[] }>> = await response.json();
  if ("error" in payload) {
    console.error("Error fetching categories: ", payload.error);
    return null;
  } else {
    return payload.occasions;
  }
}
export default async function OccasionFilterWrapper() {
  // Translation
  const t = await getTranslations();
  // Fetch occasions
  const occasions = await fetchOccasion();
  if (!occasions) {
    return <div> {t("error-occasions")}</div>;
  }

  return <OccasionFilter occasions={occasions} />;
}
