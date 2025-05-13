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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FileUpload } from "./file-upload";
import useAddOccasion from "@/hooks/occasion/use-add-occasion";

const schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "name must be at least 2 characters"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be < 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type),
      "Only JPEG, PNG, JPG and GIF are allowed",
    ),
});

type Inputs = z.infer<typeof schema>;

export default function AddOccasionForm() {
  const { isPending, AddOccasion } = useAddOccasion();

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    AddOccasion(formData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add a New Occasion</h1>

      <div className="bg-white p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <FormLabel htmlFor="name">
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter occasion name"
                        {...field}
                        className=" h-[49px] w-[746px] px-4 rounded-lg border border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel htmlFor="image">
                Occasion image <span className="text-red-500">*</span>
              </FormLabel>
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        onFileSelect={(file) => {
                          field.onChange(file);
                        }}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              disabled={isPending}
              type="submit"
              className=" mt-10 h-[41px] w-[746px] rounded-lg bg-custom-rose-900 hover:bg-custom-rose-900"
            >
              {isPending ? "Submitting..." : "Add Occasion"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
