"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useVerifyOtp } from "@/hooks/auth/use-verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPassword } from "@/hooks/auth/dummy-use-forgot-password";
import { useTranslations } from "next-intl";
import { useState } from "react";

// type VerifyOtpProps = {
//   email: string;
// };

// NOTE: to be replaced with SetPasswordForm when merging
// Lazy Loading
const SetPasswordForm = dynamic(() => import("./dummy-set-password-form"), {
  ssr: false,
  loading: () => <i className="fa fa-spinner fa-spin text-custom-rose-800 text-2xl"></i>,
});

export default function VerifyOtpForm({
  onStateChange,
}: {
  onStateChange: (state: AuthFormState) => void;
}) {
  // Translations
  const t = useTranslations();

  // State
  const [showSetPasswordForm, setShowSetPasswordForm] = useState<boolean>(false);

  // Mutation
  const { verifyOTP, isPending, error } = useVerifyOtp();
  const { resendOtp, isPending: isResending } = useForgotPassword();

  // OTP validation schema
  const verifyCodeSchema = z.object({
    code: z.string({ required_error: t("code-reqired") }).regex(/^\d{6}$/, t("code-reqired")),
  });

  // Type Zod
  type VerifyCode = z.infer<typeof verifyCodeSchema>;

  // Handle OTP submission
  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  // SubmitEvent
  const onSubmit: SubmitHandler<VerifyCode> = (values) => {
    verifyOTP(values, {
      onSuccess: () => {
        setShowSetPasswordForm(true);
      },
    });
  };

  // NOTE: to be replaced with the original resend otp.
  const handleResendOtp = () => {
    const email: string = "";
    resendOtp(email);
  };

  return (
    <>
    {showSetPasswordForm ? (
      // NOTE: to be replaced with SetPasswordForm when merging
      <SetPasswordForm />
    ) : (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
{/* OTP Input Field */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
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

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error.message}</p>}

          {/* Resend Code Section */}
          <div className="text-right text-sm">
          <span className="text-gray-600">{t("receive-code")} </span>
          <Button
           variant="link"
            className="text-custom-rose-900 hover:text-custom-rose-800 p-0 underline"
            onClick={handleResendOtp}
            type="button"
            disabled={isResending}
          >
            {isResending ? t("resending") : t("resend-code")}
          </Button>
          </div>

          {/* Submit button */}
          <Button
            className="w-full bg-custom-rose-900 rounded-2xl hover:bg-custom-rose-800"
            type="submit"
            disabled={isPending}
          >
            {isPending ? t('verifying-otp') : t("verify-code")}
          </Button>
        </form>
      </Form>
    )}
  </>
  );
}
