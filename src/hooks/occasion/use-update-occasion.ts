// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useTranslations } from "next-intl";
// import { updateOccasionsAction } from "@/lib/actions/update-occasion.action";

// export default function useupdateOccasion() {
//   //Translations
//   const t = useTranslations();

//   // Mutation
//   const { isPending, error, mutate } = useMutation({
//     mutationFn: async ({ fields, occasionId }: { fields: OccasionFields; occasionId: string }) => {
//       const payload = await updateOccasionsAction(fields, occasionId);

//       if ("error" in payload) throw new Error(payload.error);
//       return payload;
//     },

//     // Success message toast
//     onSuccess: () => {
//       toast.success("Occasion added successfully");
//     },

//     // Error message toast
//     onError: () => {
//       toast.error("Occasion already exists");
//     },
//   });

//   return { isPending, error, UpdateOccasion: mutate };
// }
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { updateOccasionsAction } from "@/lib/actions/update-occasion.action";

type Variables = {
  fields: OccasionFields;
  occasionId: string;
};

export default function useUpdateOccasion() {
  const t = useTranslations();

  const { isPending, error, mutate } = useMutation<
    APIResponse<OccasionResponse>, // result type
    Error, // error type
    Variables // variables type
  >({
    mutationFn: async ({ fields, occasionId }) => {
      const payload = await updateOccasionsAction(fields, occasionId);
      if ("error" in payload) throw new Error(payload.error);
      return payload;
    },
    onSuccess: () => {
      toast.success("Occasion updated successfully");
    },
    onError: () => {
      toast.error("Failed to update occasion");
    },
  });

  return { isPending, error, UpdateOccasion: mutate };
}
