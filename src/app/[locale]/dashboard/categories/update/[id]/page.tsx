import UpdateCategorySkeleton from "@/components/skeletons/dashboard/update-category-skeleton";
import dynamic from "next/dynamic";

// Dynamically import UpdateCategory with fallback skeleton
const UpdateCategory = dynamic(() => import("../_components/update-category"), {
  ssr: false,
  loading: () => <UpdateCategorySkeleton />,
});
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <UpdateCategory params={{ id: params.id }} />
    </div>
  );
}
