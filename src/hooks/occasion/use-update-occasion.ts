"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { updateOccasionsAction } from "@/lib/actions/update-occasion.action";

export default function useupdateOccasion() {
  //Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      fields,
      occasionId,
    }: {
      fields: OccasionUpdateFields;
      occasionId: string;
    }) => {
      const payload = await updateOccasionsAction(fields, occasionId);

      if ("error" in payload) throw new Error(payload.error);
      return payload;
    },

    // Success message toast
    onSuccess: () => {
      toast.success(t("occasion-update-success"));
    },

    // Error message toast
    onError: (error: Error) => {
      toast.error(error.message || t("failed-to-update-occasion"));
    },
  });

  return { isPending, error, updateOccasion: mutate };
}
