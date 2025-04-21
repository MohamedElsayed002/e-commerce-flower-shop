"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ArrowLeft from "@/components/common/arrow-long-left";
import ArrowRight from "@/components/common/arrow-long-right";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid phone number format. It must start with a country code",
    ),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormInputs = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const t = useTranslations();

  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // ✅ React Query mutation to simulate submission
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ContactFormInputs) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Form Submitted:", data);
          resolve(data);
        }, 1000);
      });
    },
  });

  const onSubmit = (data: ContactFormInputs) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      {/* Form Inputs */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 pl-5 pt-9 w-[750px] h-[440px] rounded-[10px] shadow-[0px_1px_30px_0px_rgba(248,43,169,0.1)] ml-5  bg-[#FFFFFF] "
      >
        {/* Name */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("name")}
                  {...field}
                  className="w-[690px] h-[50px] rounded-[10px] border-custom-rose-900 border-[1px] "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email")}
                  {...field}
                  className="w-[690px] h-[50px] rounded-[10px] border-custom-rose-900 border-[1px] "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("phone-number")}
                  {...field}
                  className="w-[690px] h-[50px] rounded-[10px]  border-custom-rose-900 border-[1px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={t("your-message")}
                  rows={5}
                  {...field}
                  className="w-[690px] h-[150px] rounded-[10px] border-custom-rose-900 border-[1px]   "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex justify-end space-x-4 pt-4 ">
          {/* Submit Button */}
          <Button 
            type="submit"
            className="bg-gradient-to-r from-custom-rose-900 to-pink-500 text-white w-[96px] h-[45px] rounded-[30px] "
            disabled={isPending}
          >
            {/* <span>
              <ArrowRight />
            </span> */}
            {isPending ? "Sending..." : "Send"}
          </Button>

          {/* Success Feedback */}
          {isSuccess && (
            <p className="text-green-600 text-center">{t("message-sent-successfully")}</p>
          )}
        </div>
      </form>
    </Form>
  );
}
