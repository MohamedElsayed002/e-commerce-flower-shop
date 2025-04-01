"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SetPasswordProps = {
  email: string;
  onStateChange: (state: AuthFormState) => void;
};

export default function SetPasswordForm({ email, onStateChange }: SetPasswordProps) {
  // Translation
  const t = useTranslations();

  // Form & Validation
  const Schema = z
    .object({
      newPassword: z
        .string({ required_error: t("password-required") })
        .min(8, t("password-min-length"))
        .regex(/[0-9]/, t("password-number-required"))
        .regex(/[a-z]/, t("password-lowercase-required"))
        .regex(/[A-Z]/, t("password-uppercase-required")),

      confirmPassword: z.string({ required_error: t("confirm-password-required") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-must-match"),
      path: ["confirmPassword"],
    });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = () => {
    // TODO: add API integration logic here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Password field */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder={t("create-password")}
                  className="w-[528px] h-[52px] rounded-[20px] p-2"
                  style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                />
              </FormControl>
              {/* Display validation errors */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder={t("re-enter-password")}
                  className="w-[528px] h-[52px] rounded-[20px] p-2"
                  style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                />
              </FormControl>
              {/* Display validation errors */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          // disabled={}
          className="bg-custom-rose-900 w-[528px] rounded-[30px] px-[31px] font-medium text-base hover:bg-custom-rose-800"
        >
          {t("set-password")}
        </Button>
      </form>
    </Form>
  );
}
