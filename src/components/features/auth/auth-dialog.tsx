"use client";

import { useState} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

// Dynamically import form components 
const LoginForm = dynamic(
  () => import("./components/login-form"),
  { ssr: false ,loading :()=> <p>loading..</p>}
);

const RegisterForm = dynamic(
  () => import("./components/register-form"), { ssr: false ,loading :()=> <p>loading..</p>}
);

const ForgetPassword = dynamic(
  () =>
    import("./components/forgot-password-form"), { ssr: false ,loading :()=> <p>loading..</p>}
);

const VerifyOtpForm = dynamic(
  () => import("./components/verify-otp-form"),
  { ssr: false ,loading :()=> <p>loading..</p>}
);

export default function AuthDialog (){

  // State
  const [authState, setAuthState] = useState<AuthFormState>("login");
  const [open, setOpen] = useState(true);

  return (
    <Dialog onOpenChange={(open)=> setOpen(open)} defaultOpen={open}>

      {/* DialogTitle */}
      <DialogTitle ></DialogTitle>
      
      {/* DialogTrigger */}
      <DialogTrigger>
        <Button className="rounded-3xl bg-custom-rose-900 hover:bg-custom-rose-800">Login</Button>
      </DialogTrigger>
      {/* Main dialog container with custom sizing */}
      <DialogContent className="p-6 w-[608px] h-auto ">

         {/* LoginForm */}
        {authState === "login" && (
          <LoginForm onStateChange={setAuthState}  />
        )}

        {/* RegisterForm */}
        {authState === "register" && (
          <RegisterForm onStateChange={setAuthState} />
        )}

        {/* ForgetPassword */}
        {authState === "forgot-password" && (
          <ForgetPassword onStateChange={setAuthState}  />
        )}

        {/* VerifyOtpForm  */}
          {authState === "verify-otp" && (
          <VerifyOtpForm onStateChange={setAuthState}  />
        )}

    {/* SetPassword */}
        {authState === "set-password" && (
          <SetPassword onStateChange={setAuthState}  />
        )}
      </DialogContent>
    </Dialog>
  );
}
