"use client";

import { deleteOccasion } from "@/lib/actions/occasion/delete-occasion";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useDeleteOccasion() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ occasionId }: { occasionId: string }) => {
      const response = await deleteOccasion({ occasionId });

      if (response.message !== "success") {
        const errorData = await response.json();
        throw new Error(errorData.message || t('failed-to-delete-occasion'));
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("occasion-deleted-successfully"));
    },
    onError: () => {
      toast.error(t("delete-failed"));
    },
  });

  return { isPending, error, mutate };
}
