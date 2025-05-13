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
import { FileUp, Loader } from "lucide-react";
import { useAddCategory } from "@/hooks/dashboard/use-addcategory";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

export default function AddCategory() {
  //  Translations
  const t = useTranslations();

  // Validation schema
  const Schema = z.object({
    name: z.string({ required_error: "Category name is required" }).min(2, {
      message: "name must be at least 2 characters.",
    }),
    image: z
      .instanceof(File, { message: t("image-required") })
      .refine((file) => file.size > 0, { message: t("image-required") }),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(Schema),
  });

  // Add category
  const { addCategory, isLoading } = useAddCategory();

  // Handle form submission
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    // Call the addCategory function with the form data
    await addCategory(formData);
  };

  return (
    <div className="bg-white w-full   rounded-md p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
                {/* Label */}
                <FormLabel className="captalize font-medium text-sm font-inter">
                  Category Name<span className="text-custom-rose-900">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    {...field}
                    type="text"
                    className=" w-4/5  border-blue-gray-100 border-2 rounded-lg"
                  />
                </FormControl>

                {/* Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="captalize font-medium text-sm font-inter h-12">
                  {t("category-image")}
                  <span className="text-custom-rose-900">*</span>
                </FormLabel>

                <FormControl>
                  <div className="relative w-4/5">
                    <FormLabel
                      htmlFor="image-upload"
                      className="flex items-center justify-between w-full cursor-pointer border h-12 border-gray-300 rounded-md px-4 py-2"
                    >
                      {field.value && (
                        <p className="text-sm text-gray-600 mt-2">
                          {t("selected-file:")} {field.value.name}
                        </p>
                      )}
                      <span className="flex items-center gap-1 text-sm">
                        {/* File icon */}
                        <FileUp className="w-4 h-4 text-custom-gray" />
                        <span className="text-pink-500  font-normal text-sm">
                          {t("upload-image")}
                        </span>
                      </span>
                    </FormLabel>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </div>
                </FormControl>
                {/* Message */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="bg-custom-rose-900 w-4/5  text-white h-10 rounded-lg mt-16 capitalize font-semibold text-sm"
          >
            {isLoading ? <Loader className="text-center" /> : "Add Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
