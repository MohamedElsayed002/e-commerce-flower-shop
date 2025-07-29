import { deleteProduct } from "@/lib/actions/dashboard/product.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useDeleteProduct() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const payload = await deleteProduct(productId);
      console.log("payload:", payload);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("product-deleted-successfully"));
    },
    onError: (error: Error) => {
      toast.error(t("failed-to-delete-product") + error.message);
    },
  });

  return { deleteProduct: mutate };
}
