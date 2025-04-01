"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ImSpinner3 } from "react-icons/im";

// Dynamically import form components
const LoginForm = dynamic(() => import("./components/login-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const RegisterForm = dynamic(() => import("./components/register-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const ForgotPasswordForm = dynamic(() => import("./components/forgot-password-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const SetPasswordForm = dynamic(() => import("./components/set-password-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const VerifyOTPForm = dynamic(() => import("./components/verify-otp-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

export default function AuthDialog() {
  // Translations
  const t = useTranslations();

  // State
  const [authState, setAuthState] = useState<AuthFormState>("login");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Function
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => setAuthState("login"), 300);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      {/* DialogTrigger */}
      <DialogTrigger asChild>
        <Button className="rounded-3xl bg-custom-rose-900 hover:bg-custom-rose-800 ">
          {t("login")}
        </Button>
      </DialogTrigger>

      {/* Main dialog container */}
      <DialogContent>
        {/* Dialog header*/}
        <DialogHeader>
          {/* Dialog title*/}
          <DialogTitle className="text-left font-normal my-3 text-2xl rtl:text-right ms-2 rtl:me-2 ">
            {/* Return title base on state*/}
            {authState === "login" && t("login-title")}
            {authState === "register" && t("register-title")}
            {authState === "forgot-password" && t("forgot-password-title")}
            {authState === "set-password" && t("set-password-title")}
            {authState === "verify-otp" && t("verify-code-title")}
          </DialogTitle>
        </DialogHeader>

        {/* Login form */}
        {authState === "login" && <LoginForm onStateChange={setAuthState} />}

        {/* Register form */}
        {authState === "register" && <RegisterForm onStateChange={setAuthState} />}

        {/* Forgot password form */}
        {authState === "forgot-password" && (
          <ForgotPasswordForm onStateChange={setAuthState} setEmail={setEmail} />
        )}

        {/* Verify OTP form */}
        {authState === "verify-otp" && <VerifyOTPForm email={email} />}

        {/* Set password form */}
        {authState === "set-password" && <SetPasswordForm email="" onStateChange={setAuthState} />}
      </DialogContent>
    </Dialog>
  );
}
