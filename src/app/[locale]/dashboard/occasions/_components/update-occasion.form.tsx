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
import useUpdateOccasion from "@/hooks/occasion/use-update-occasion";

export default function UpdateOccasionForm({
  initialData,
  occasionId,
}: {
  initialData?: Occasions;
  occasionId: string;
}) {
  const { isPending, UpdateOccasion } = useUpdateOccasion();

  const Schema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "name must be at least 2 characters"),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      name: initialData?.name,
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const fields: OccasionFields = {
      name: values.name,
    };

    if (values.name !== initialData?.name) {
      fields.name = values.name;
    }
    UpdateOccasion({ fields, occasionId });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Occasion</h1>

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
                  <FormItem className="w-[746px]">
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter occasion name"
                        {...field}
                        className="h-[49px] w-full px-4 rounded-lg border border-input"
                      />
                    </FormControl>

                    <FormMessage />

                    {/* Button to toggle image visibility */}
                    <div className="mt-2 flex justify-end ">
                      <button className="text-blue-600 text-sm border border-gray-300 p-2 rounded-md">
                        View occasion image
                      </button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
                className=" h-[41px] w-[746px] rounded-lg bg-custom-rose-900 hover:bg-custom-rose-900"
              >
                {isPending ? "Updating..." : "Update Occasion"}
              </Button>
            </div>

            {/* <Button
              disabled={isPending}
              type="submit"
              className="mt-10 h-[41px] w-[746px] rounded-lg bg-custom-rose-900 hover:bg-custom-rose-900"
            >
              {isPending ? "Updating..." : "Update Occasion"}
            </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
