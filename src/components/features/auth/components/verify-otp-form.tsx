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

type VerifyOtpProps = {
  email: string;
};

// Lazy Loading
const SetPasswordForm = dynamic(() => import("./dummy-set-password-form"), {
  ssr: false,
  loading: () => <i className="fa fa-spinner fa-spin text-custom-rose-800 text-2xl"></i>,
});

export default function VerifyOtpForm({ email }: VerifyOtpProps) {
  // Translation
  const t = useTranslations();

  // State
  // const [showSetPasswordForm, setShowSetPasswordForm] = useState(false);

  // Mutation
  const { verifyOTP, isPending, showSetPasswordForm } = useVerifyOtp();
  const { resendOtp, isPending: isResending } = useForgotPassword();

  // NOTE: to be removed when merging
  const Schema = z.object({
    resetCode: z.string({ required_error: "Required" }),
  });
  type Inputs = z.infer<typeof Schema>;

  // NOTE: to be removed when merging
  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    // debugger;
    verifyOTP(values);
    // setShowSetPasswordForm(true);
  };

  const handleResendOtp = () => {
    resendOtp(email);
  };

  return (
    <>
      {showSetPasswordForm ? (
        <SetPasswordForm />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP field */}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter OTP"
                      className="w-[528px] h-[52px] rounded-[20px] p-2"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.1)" }}
                    />
                  </FormControl>
                  {/* Display validation errors */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resend Button */}
            <Button
              onClick={handleResendOtp}
              disabled={isResending}
              type="button"
              className="text-custom-rose-900 font-medium text-base"
            >
              {isResending ? t("resending") : t("resend")}
            </Button>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isPending}
              className="bg-custom-rose-900 w-[528px] rounded-[30px] px-[31px] font-medium text-base hover:bg-custom-rose-800"
            >
              {isPending ? "Verifying OTP..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
