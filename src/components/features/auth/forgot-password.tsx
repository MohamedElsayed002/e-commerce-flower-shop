"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useForgotPassword from "./_hooks/use-forgot-password-hook";
import useResetPassword from "./_hooks/use-reset-password-hook";
import useVerifyPassword from "./_hooks/use-verify-password-hook";

export default function ForgotPassword() {
  const [emailDialog, setEmailDialog] = useState(true);
  const [codeDialog, setCodeDialog] = useState(false);
  const [confirmPasswordDialog, setConfirmPasswordDialog] = useState(false);

  const { isPending, mutate: ForgotPasswordMutate, error } = useForgotPassword();

  const t = useTranslations();

  const formSchema = z.object({
    email: z.string().email({ message: t("invalid-email") }),
  });

  const codeSchema = z.object({
    code: z.string().min(6, { message: t("minimum-code-is-6-characters") }),
  });

  const newPasswordSchema = z
    .object({
      password: z.string().min(8, { message: t("minimum-characters-is-8") }),
      confirmPassword: z.string().min(8, { message: t("minimum-characters-is-8") }),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
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
      password: "",
      confirmPassword: "",
    },
  });

  function EmailSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setEmailDialog(false);
    setConfirmPasswordDialog(false);
    setCodeDialog(true);
    ForgotPasswordMutate({ email: values.email });
  }

  function CodeSubmit(values: z.infer<typeof codeSchema>) {
    console.log(values);
    setConfirmPasswordDialog(true);
    setCodeDialog(false);
    setEmailDialog(false);
  }

  function NewPasswordSubmit(values: z.infer<typeof newPasswordSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setEmailDialog(true);
            setCodeDialog(false);
            setConfirmPasswordDialog(false);
          }}
        >
          {t("forgot-password")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {emailDialog && (
          <>
            <DialogHeader>
              <DialogTitle className="rtl:text-start">{t("forgot-password")}</DialogTitle>
            </DialogHeader>
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
                <Button
                  className="w-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </>
        )}
        {codeDialog && (
          <>
            <DialogHeader>
              <DialogTitle className="rtl:text-start">{t("verify-code")}</DialogTitle>
            </DialogHeader>
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
                <Button
                  className="w-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </>
        )}
        {confirmPasswordDialog && (
          <>
            <DialogHeader>
              <DialogTitle className="rtl:text-start">{t("set-a-password")}</DialogTitle>
            </DialogHeader>
            <Form {...newPasswordForm}>
              <form
                onSubmit={newPasswordForm.handleSubmit(NewPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={newPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full border"
                          type="password"
                          placeholder={t("enter-your-password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newPasswordForm.control}
                  name="confirmPassword"
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
                <Button
                  className="w-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
