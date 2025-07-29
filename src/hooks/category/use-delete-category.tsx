"use client";

import { deleteCategory } from "@/lib/actions/category/delete-category";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useDeleteCategory() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ categoryId }: { categoryId: string }) => {
      const response = await deleteCategory({ categoryId });

      if (response.message !== "success") {
        const errorData = await response.json();
        throw new Error(errorData.message || t('failed-to-delete-category'));
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("category-deleted-successfully"));
    },
    onError: () => {
      toast.error(t("delete-failed"));
    },
  });

  return { isPending, error, mutate };
}
