"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Dynamically import form components
const LoginForm = dynamic(() => import("./components/login-form"), {
  ssr: false,
  loading: () => <p>loading..</p>,
});

// Dummy component for testing state
const RegisterForm = dynamic(() => import("./components/register-form"), {
  ssr: false,
  loading: () => <p>loading..</p>,
});

// const ForgetPassword = dynamic(
//   () =>
//     import("./components/forgot-password-form"), { ssr: false ,loading :()=> <p>loading..</p>}
// );

// const SetPassword = dynamic(
//   () =>
//     import("./components/set-password-form"), { ssr: false ,loading :()=> <p>loading..</p>}
// );

const VerifyOtpForm = dynamic(() => import("./components/verify-otp-form"), {
  ssr: false,
  loading: () => <p>loading..</p>,
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
          {" "}
          {t("login")}
        </Button>
      </DialogTrigger>

      {/* Main dialog container with custom sizing */}
      <DialogContent>
        {/* Server-side Render */}
        <DialogHeader className="sr-only">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* LoginForm */}
        {authState === "login" && <LoginForm onStateChange={setAuthState} />}

        {/* RegisterForm */}
        {authState === "register" && <RegisterForm onStateChange={setAuthState} />}

        {/* ForgetPassword */}
        {/* {authState === "forgot-password" && (
          <ForgetPassword onStateChange={setAuthState}  />
        )} */}

        {/* VerifyOtpForm  */}
        {authState === "verify-otp" && <VerifyOtpForm onStateChange={setAuthState} />}

        {/* SetPassword  */}
        {/* {authState === "set-password" && (
          <SetPassword onStateChange={setAuthState}  />
        )} */}

        {/* Server-side Rendered Form */}
        <div className="grid gap-4 py-4 sr-only">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
