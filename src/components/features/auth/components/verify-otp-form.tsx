"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import { toast } from "sonner";

type VerifyOtpFormProps = {
  email: string;
};

export default function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  // Translations
  const t = useTranslations();

  // Mutations
  const { mutate: forgotPasswordMutate, isPending: forgotPasswordLoading } = useForgotPassword();

  // Form & Validation
  const verifyCodeSchema = z.object({
    code: z.string({ required_error: t("code-reqired") }).regex(/^\d{6}$/, t("code-reqired")),
  });
  type VerifyCode = z.infer<typeof verifyCodeSchema>;

  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  // Functions
  const onSubmit = (data: VerifyCode) => {
    console.log("Verification code:", data.code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-96">
        {/* Input field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="sr-only">{t("enter-code")}</FormLabel>
              <FormControl>
                {/* Input */}
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder={t("enter-code")}
                  className="w-full h-12 text-left rtl:text-right text-xl  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
                />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resend code */}
        <div className="text-right text-sm">
          <span className="text-gray-600">{t("receive-code")} </span>
          <Button
            disabled={forgotPasswordLoading}
            variant="link"
            className="text-custom-rose-900 hover:text-custom-rose-800 p-0 underline"
            onClick={() =>
              forgotPasswordMutate(email, {
                onError: (error) => toast.error(error.message),
              })
            }
            type="button"
          >
            {t("resend-code")}
          </Button>
        </div>

        {/* Button Submit */}
        <Button
          type="submit"
          className="w-full bg-custom-rose-900 rounded-2xl hover:bg-custom-rose-800"
        >
          {t("verify-code")}
        </Button>
      </form>
    </Form>
  );
}
