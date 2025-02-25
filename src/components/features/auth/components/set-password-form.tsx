"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSetNewPassword } from "@/hooks/auth/use-set-password";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useState } from "react";

// Lazy Loading
const LoginForm = dynamic(() => import('./dummy-login-form'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function SetPasswordForm() {
  // Translation
  const t = useTranslations();

// State
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Mutation
  const { mutate, isPending } = useSetNewPassword();

  // Form & Validation
  const Schema = z
    .object({
      email: z.string({ required_error: t("email-required") }).email(t("invalid-email-format")),
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
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ email: data.email, newPassword: data.newPassword }, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        setShowLoginForm(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      {showLoginForm ? (
        <LoginForm />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder={t('enter-e-mail')}
                      className="w-[528px] h-[52px] rounded-[20px] p-2"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                    />
                  </FormControl>
                  {/* Display validation errors */}
                  <FormMessage />
                </FormItem>
              )}
            />

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
              disabled={isPending}
              className="bg-custom-rose-900 w-[528px] rounded-[30px] px-[31px] font-medium text-base hover:bg-custom-rose-800"
            >
              {isPending ? t('setting-new-password') : t('set-password')}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
