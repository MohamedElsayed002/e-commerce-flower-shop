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
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Heading from "@/components/common/header";
import { Textarea } from "@/components/ui/textarea";
import { useAddProduct } from "@/hooks/dashboard/use-add-product";


export default function ProductForm() {
  // Translation
  const t = useTranslations();
   
  // Validation
  const Schema = z.object({
    name: z.string().min(1, t("name-is-required")).min(2, t("name-must-be-at-least-2-characters")),
    message: z
      .string()
      .min(1, t("message-is-required"))
      .min(10, t("message-must-be-at-least-10-characters")),
    image: z
      .instanceof(File, { message: t("image-required") })
      .refine((file) => file.size > 0, { message: t("image-required") }),

    price: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      })
      .min(0.01, "Price must be greater than 0"),

    pricediscount: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      })
      .min(0.01, "Price must be greater than 0"),

    priceafterdiscount: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      })
      .min(0.01, "Price must be greater than 0"),

    quantity: z
      .number({ required_error: "Quantity is required" })
      .min(1, "Minimum quantity is 1")
      .max(1000, "Maximum quantity is 1000"),
  });

  type Inputs = z.infer<typeof Schema>;
   
  // Form
  const form = useForm({
    defaultValues: {
      name: "",
      message: "",
    },
    resolver: zodResolver(Schema),
  });

  // Mutation
   const { addProducts, isLoading } = useAddProduct();

  // Submission
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
     await addProducts(formData);
  };

  return (
    <>
      {/* Heading */}
      <Heading>{t('add-a-new-product')}</Heading>
        
        {/* Form */}
        <div className="bg-white w-full rounded-lg p-6 flex flex-col gap-5 shadow-sm">
        {/* Form add product */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Title */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                   {t('title')}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>

                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder={t('enter-product-title')}
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

            {/* Description field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                    {t('description')}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('enter-product-description')}
                      rows={5}
                      {...field}
                      className=" w-4/5 max-h-64 border-2 border-blue-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {/* Price field */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                     {t('price')}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder={t('example-5000')}
                        {...field}
                        type="number"
                        className=" w-[242px] h-14 border-blue-gray-100 border-2 rounded-lg"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount field */}
              <FormField
                control={form.control}
                name="pricediscount"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                      Discount
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Example: 5"
                        {...field}
                        type="number"
                        className=" w-[242px] h-14  border-blue-gray-100 border-2 rounded-lg"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price after discount  */}
              <FormField
                control={form.control}
                name="priceafterdiscount"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter">
                      Price after discount
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Example: 5"
                        {...field}
                        type="number"
                        className=" w-[242px] h-14 border-blue-gray-100 border-2 rounded-lg"
                      />
                    </FormControl>

                    {/* Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mb-6">
                  {/* Label */}
                  <FormLabel className="captalize font-medium text-sm font-inter">
                   {t('quantity')}
                    <span className="text-custom-red-100 ps-1">*</span>
                  </FormLabel>

                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="Example: 200"
                      {...field}
                      type="number"
                      className=" w-4/5  border-blue-gray-100 border-2 rounded-lg"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image field */}
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter h-12">
                      Product cover image
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>

                    <FormControl>
                      <div className="relative w-4/5">
                        {/* Label */}
                        <FormLabel
                          htmlFor="image-upload"
                          className="flex items-center justify-between cursor-pointer border w-[364px] h-12 border-gray-300 rounded-md px-4 py-2"
                        >
                          {/* Show selected file name */}
                          <div className="flex-1 min-w-0 text-left">
                            {field.value ? (
                              <p className="text-sm text-gray-600 truncate">
                                {t('selected-file')}: {field.value.name}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-400 truncate">
                              {t('selected-image-name-examp')}
                              </p>
                            )}
                          </div>
                          <span className="flex items-center gap-1 text-sm">
                            {/* File icon */}
                            <FileUp className="w-4 h-4 text-custom-gray" />

                            {/* Upload image */}
                            <span className="text-pink-500  font-normal text-sm">Upload file</span>
                          </span>
                        </FormLabel>
                        {/* Input */}
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

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* Label */}
                    <FormLabel className="captalize font-medium text-sm font-inter h-12">
                    {t('product-gallery')}
                      <span className="text-custom-red-100 ps-1">*</span>
                    </FormLabel>

                    <FormControl>
                      <div className="relative w-4/5">
                        {/* Label */}
                        <FormLabel
                          htmlFor="image-upload"
                          className="flex items-center justify-between cursor-pointer border w-[364px] h-12 border-gray-300 rounded-md px-4 py-2"
                        >
                          {/* Show selected file name */}
                          <div className="flex-1 min-w-0 text-left">
                              <p className="text-sm text-gray-600 truncate">
                                {t("selected-file")}: {field.value.name}
                              </p>
                             
                          </div>
                          <span className="flex items-center gap-1 text-sm">
                            {/* File icon */}
                            <FileUp className="w-4 h-4 text-custom-gray" />

                            {/* Upload image */}
                            <span className="text-pink-500  font-normal text-sm">Upload file</span>
                          </span>
                        </FormLabel>
                        {/* Input */}
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
            </div>

            {/* Submit button */}
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className=" bg-custom-rose-900 w-4/5 text-white h-10 rounded-lg mt-16 capitalize font-semibold text-sm"
            >
                {isLoading ? <Loader className="text-center" /> :t('add-product')}
            </Button>
          </form>
        </Form>
      </div>

    
    </>
    
  );
}
