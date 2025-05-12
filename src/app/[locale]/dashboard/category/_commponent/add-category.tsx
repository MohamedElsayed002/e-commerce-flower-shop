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
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FileUp, Loader } from "lucide-react";
import { useAddCategory } from "@/hooks/dashboard/use-addcategory";
import { Button } from "@/components/ui/button";

export default function AddCategory() {
  // const formRef = useRef<HTMLFormElement>(null);

  const Schema = z.object({
    name: z.string({ required_error: "Category name is required" }).min(2, {
      message: "name must be at least 2 characters.",
    }),
    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size > 0, { message: "Image is required" }),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(Schema),
  });

  const { addCategory, isLoading } = useAddCategory();
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    await addCategory(formData);
  };
  // const onSubmit: SubmitHandler<Inputs> = async () => {
  //   const formData = new FormData(formRef.current || undefined);

  //   await addcategory(formData);
  //   console.log("values", form.getValues());
  //   console.log("formData", formData.get("name"));
  //   console.log("formData", formData.get("image"));
  // };
  return (
    <div className="bg-white w-full max-w-4xl  rounded-md p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
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
                <FormLabel className="captalize font-medium text-sm font-inter ">
                  Category image
                  <span className="text-custom-rose-900">*</span>
                </FormLabel>

                <FormControl>
                  <div className="relative w-4/5">
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-end w-full cursor-pointer border border-gray-300 rounded-md px-4 py-2"
                    >
                      <span className="flex items-center gap-1 text-sm">
                        <FileUp className="w-4 h-4 text-custom-gray" />
                        <span className="text-pink-500  font-normal text-sm">Upload Image</span>
                      </span>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="bg-custom-rose-900 w-4/5  text-white h-10 rounded-lg mt-16"
          >
            {isLoading ? <Loader className="text-center" /> : "Add Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
