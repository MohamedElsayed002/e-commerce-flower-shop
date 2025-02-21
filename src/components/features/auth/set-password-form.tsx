"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Toaster } from "@/components/ui/sonner";

export default function SetPasswordForm() {
  // Translation
  const t = useTranslations();

  // Router
  // const router = useRouter(); // TODO

  // State
  // const [error, setError] = useState<string | null>(null); // TODO
  // const [loading, setLoading] = useState(false); // TODO

  // Form & Validation
  const Schema = z
    .object({
      password: z
        .string({ required_error: t('password-required') })
        .min(8, t('password-min-length'))
        .regex(/[0-9]/, t('password-number-required'))
        .regex(/[a-z]/, t('password-lowercase-required'))
        .regex(/[A-Z]/, t('password-uppercase-required')),

      confirmPassword: z.string({ required_error: t('confirm-password-required') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwords-must-match'),
      path: ["confirmPassword"],
    });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async () => {
    // TODO: Add API integration logic here
  };

  return (
    <Dialog>
      {/* Dialog trigger button */}
      <DialogTrigger asChild>
        <Button variant="outline">{t("set-new-password")}</Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent>
        <DialogHeader>
          {/* Dialog title */}
          <DialogTitle className="font-normal font-inter leading-9 pt-[6px] pb-2 text-3xl rtl:text-start">
            {t('set-a-password')}
          </DialogTitle>
        </DialogHeader>

        {/* Form wrapper */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password input field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder={t('create-password')}
                      className="w-[528px] h-[52px] rounded-[20px] p-2"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                    />
                  </FormControl>
                  {/* Display validation errors for the password field */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password input field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder={t('re-enter-password')}
                      className="w-[528px] h-[52px] rounded-[20px] p-2"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                    />
                  </FormControl>
                  {/* Display validation errors for the confirm password field */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form footer with submit button */}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-custom-rose-900 w-[528px] rounded-[30px] px-[31px] font-medium text-base hover:bg-custom-rose-800"
              >
                {/* Display loading or submit text based on the loading state */}
                {t('set-a-password')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

    </Dialog>
  );
}