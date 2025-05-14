"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateCategory } from "@/hooks/dashboard/use-updatecategory";
import { GalleryCarouselDialog } from "@/components/features/dashboard/dialog/gallery-dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCategoryById } from "@/hooks/dashboard/use-category-by-id";
import Heading from "@/components/common/header";

export default function UpdateCategoryPage({ params }: { params: { id: string } }) {
  // Translation
  const t = useTranslations();

  // State
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Mutation
  const { updateCategory, isLoading } = useUpdateCategory();
  const { data: category } = useCategoryById(params.id);

  // Validation schema
  const Schema = z.object({
    name: z.string({ required_error: t("name-required") }).min(2, {
      message: t("name-min-length"),
    }),
  });

  type Inputs = z.infer<typeof Schema>;
  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    values: category ? { name: category.name } : { name: "" },
  });

  // Handle form submission
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    await updateCategory({ id: params.id, data: formData });
  };

  return (
    <>
      {/* Heading */}
      <Heading name={category?.name || ""}>{t("update-cat")} :</Heading>

      <div className="bg-white w-full rounded-lg p-6 shadow-sm">
        {/* Form update category*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Category name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t("label-name")}
                    <span className="text-custom-rose-900 ps-1">*</span>
                  </FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="Flowers"
                      {...field}
                      type="text"
                      className="w-4/5 border-blue-gray-100 border-2 rounded-lg"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trigger to open gallery dialog */}
            <div className="flex justify-end w-4/5">
              <div className="text-stats-orders-primary flex items-center gap-2 font-normal text-sm  border-2 border-blue-gray-100 rounded-lg p-2 ">
                <Image className="w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="text-stats-orders-primary capitalize"
                >
                  {t("dialog-image")}
                </button>
              </div>
            </div>

            {/* Gallery dialog */}
            <GalleryCarouselDialog
              isOpen={galleryOpen}
              onClose={() => setGalleryOpen(false)}
              images={category?.image ? [category.image] : []}
            />

            {/* Submit button */}
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="bg-custom-rose-900 w-4/5 text-white h-10 rounded-lg mt-16 capitalize font-semibold text-sm"
            >
              {isLoading ? <Loader className="text-center" /> : t("button-update")}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
