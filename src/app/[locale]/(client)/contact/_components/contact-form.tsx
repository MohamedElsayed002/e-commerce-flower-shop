"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { UseContact } from "@/hooks/contact/use-contact";
import ArrowRight from "@/components/common/arrow-long-right";

export default function ContactForm() {
  // Translation
  const t = useTranslations();

  type ContactFormInputs = z.infer<typeof contactSchema>;

  // Mutation
  const { mutate, isPending } = UseContact();

  const onSubmit = (data: ContactFormInputs) => {
    mutate(data);
  };

  // Validation
  const contactSchema = z.object({
    name: z.string().min(1, t("name-is-required")).min(2, t("name-must-be-at-least-2-characters")),
    phone: z
      .string()
      .min(1, t("phone-number-is-required"))
      .regex(
        /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        t("invalid-phone-number-format-it-must-start-with-a-country-code"),
      ),
    email: z.string().min(1, t("email-is-required")).email(t("invalid-email-format")),
    message: z
      .string()
      .min(1, t("message-is-required"))
      .min(10, t("message-must-be-at-least-10-characters")),
  });

  // Form
  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 pl-5 pt-9 w-[750px] my-16 h-[440px] rounded-[10px] shadow-[0px_1px_30px_0px_rgba(248,43,169,0.1)] ml-5 bg-[#FFFFFF]"
      >
        {/* Name Field */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("name")}
                  {...field}
                  className="w-[690px] h-[50px] rounded-[10px] border-custom-rose-900 border-[1px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
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
                  className="w-[690px] h-[50px] rounded-[10px] border-custom-rose-900 border-[1px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("phone")}
                  {...field}
                  className="w-[690px]  h-[50px] rounded-[10px] border-custom-rose-900 border-[1px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
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
                  className="w-[690px] h-[150px] rounded-[10px] border-custom-rose-900 border-[1px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Send Button */}
        <div className="flex justify-end ">
          <Button
            type="submit"
            className="bg-gradient-to-r my-5 text-[16px] font-medium from-custom-rose-900 to-pink-500 text-white w-[96px] h-[45px] rounded-[30px]"
            disabled={isPending}
          >
            {t("send")}
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
