"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
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

// Dummy component for testing state
const RegisterForm = dynamic(() => import("./components/register-form"), {
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

  // Reset to login state when closing
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setAuthState("login");
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
        {/* DialogHeader*/}
        <DialogHeader>
          {/* DialogTitle*/}
          <DialogTitle className="text-left font-normal my-3 text-2xl rtl:text-right ms-2 rtl:me-2 ">
            {/* Return Title Base on State*/}
            {authState === "login" && t("login-title")}
            {authState === "register" && t("register-title")}
            {authState === "verify-otp" && t("verify-code-title")}
            {authState === "set-password" && t("set-password-title")}
            {authState === "forgot-password" && t("forgot-password-title")}
          </DialogTitle>
          {/* DialogDescriptionr read on server*/}
          <DialogDescription className="sr-only">DialogDescription</DialogDescription>
        </DialogHeader>

        {/* LoginForm */}
        {authState === "login" && <LoginForm onStateChange={setAuthState} />}

        {/* RegisterForm */}
        {authState === "register" && <RegisterForm onStateChange={setAuthState} />}
      </DialogContent>
    </Dialog>
  );
}
