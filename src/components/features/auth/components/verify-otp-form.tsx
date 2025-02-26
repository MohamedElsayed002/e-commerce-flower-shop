"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useVerifyOtp } from "@/hooks/auth/use-verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

// Lazy Loading
const SetPasswordForm = dynamic(() => import("./dummy-set-password-form"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function VerifyOtpForm({ email }: { email: string }) {
  // State
  const [showSetPasswordForm, setShowSetPasswordForm] = useState(false);

  // Mutation
  const { mutate, isPending } = useVerifyOtp();
  // const { mutate: resendOtp, isPending: isResending } = useForgotPassword();

  // NOTE: to be removed when merging
  const Schema = z.object({
    otp: z.string({ required_error: "Required" }),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data.otp, {
      onSuccess: () => {
        toast.success("You can reset your password.");
        setShowSetPasswordForm(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleResendOtp = () => {
    // resendOtp({ email }, {
    //   onSuccess: () => {
    //     toast.success("OTP resent successfully");
    //   },
    //   onError: (error) => {
    //     toast.error(error.message);
    //   },
    // });
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
              name="otp"
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
            <Button onClick={handleResendOtp}  disabled={isResending} type="button" className="text-custom-rose-900 font-medium text-base">
            {/* {isResending ? "Resending..." : "Resend OTP"} */}
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
