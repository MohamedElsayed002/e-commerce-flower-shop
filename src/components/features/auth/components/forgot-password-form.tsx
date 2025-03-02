"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function ForgotPassword() {
  // Translation
  const t = useTranslations();

  // State
  const [emailDialog, setEmailDialog] = useState(true);
  const [codeDialog, setCodeDialog] = useState(false);
  const [confirmPasswordDialog, setConfirmPasswordDialog] = useState(false);

  // Form and Validation
  const formSchema = z.object({
    email: z.string().email({ message: t("invalid-email") }),
  });

  const codeSchema = z.object({
    code: z.string().min(6, { message: t("minimum-code-is-6-characters") }),
  });

  const newPasswordSchema = z.object({
    email: z.string().email({ message: t("invalid-email") }),
    newPassword: z
      .string()
      .min(8, { message: t("minimum-characters-is-8") })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message: t(
          "minimum-password-characters-8-contains-lowercase-and-uppercase-and-numbers-and-one-symbol-atleast",
        ),
      }),
  });

  const emailForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const newPasswordForm = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  // Functions
  function EmailSubmit(values: z.infer<typeof formSchema>) {}

  function CodeSubmit(values: z.infer<typeof codeSchema>) {}

  function NewPasswordSubmit(values: z.infer<typeof newPasswordSchema>) {}

  return (
    <>
      {/* Button to Open Dialog */}
      <Button
        onClick={() => {
          setEmailDialog(true);
          setCodeDialog(false);
          setConfirmPasswordDialog(false);
        }}
      >
        {t("forgot-password")}
      </Button>

      {/* First Dialog - Email */}
      {emailDialog && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(EmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      className="w-full"
                      placeholder={t("enter-your-email-address")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-custom-rose-700 hover:bg-custom-rose-500" type="submit">
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}

      {/* Second Dialog - Code Verification */}
      {codeDialog && (
        <Form {...codeForm}>
          <form onSubmit={codeForm.handleSubmit(CodeSubmit)} className="space-y-4">
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-full" placeholder={t("enter-code")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-custom-rose-700 hover:bg-custom-rose-500" type="submit">
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}

      {/* Third Dialog - New Password */}
      {confirmPasswordDialog && (
        <Form {...newPasswordForm}>
          <form onSubmit={newPasswordForm.handleSubmit(NewPasswordSubmit)} className="space-y-4">
            <FormField
              control={newPasswordForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full border"
                      placeholder={t("enter-your-email-address")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full border"
                      type="password"
                      placeholder={t("confirm-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-custom-rose-700 hover:bg-custom-rose-500" type="submit">
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}