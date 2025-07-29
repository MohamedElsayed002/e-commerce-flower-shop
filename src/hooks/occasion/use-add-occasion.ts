"use client";

import { addOccasionsAction } from "@/lib/actions/add-occasion.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useAddOccasion() {
  //Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await addOccasionsAction(formData);

      if ("error" in payload) throw new Error(payload.error);
      return payload;
    },

    // Success message toast
    onSuccess: () => {
      toast.success(t("occasion-add-success"));
    },

    // Error message toast
    onError: (error: Error) => {
      toast.error(error.message || t("failed-to-add-occasion"));
    },
  });

  return { isPending, error, AddOccasion: mutate };
}
