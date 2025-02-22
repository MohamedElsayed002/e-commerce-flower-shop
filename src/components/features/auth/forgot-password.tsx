"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

// Forgot Password Schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter valid emaill" }),
});

// Verify code Schema
const verifyCodeSchema = z.object({
  code: z.string().min(6, { message: "Code must be at least 6 characters" }),
});

// create new password
const createNewPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This ensures the error appears under confirmPassword
  });

export default function ForgotPassword() {
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(true);
  const [verifyCodeDialog, setVerifyCodeDialog] = useState(false);
  const [createNewPassword, setCreateNewPassword] = useState(false);

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const verifyCodeForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const createNewPasswordForm = useForm<z.infer<typeof createNewPasswordSchema>>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const forgotPasswordSubmit = (data: { email: string }) => {
    console.log(data.email);

    // Open Verify Code Dialog
    setForgotPasswordDialog(false);
    setCreateNewPassword(false);
    setVerifyCodeDialog(true);
  };

  const verifyCodeSubmit = (data: { code: string }) => {
    console.log(data.code);
    setCreateNewPassword(true);
    setVerifyCodeDialog(false);
  };

  const createNewPasswordSubmit = (data: { password: string; confirmPassword: string }) => {
    console.log(data.password);
    console.log(data.confirmPassword);
    // Close all dialogs and handle the password reset process
    setCreateNewPassword(false);
  };

  return (
    <Dialog>
      {/* Dialog trigger button  */}
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      {/* Forgot Password Dialog */}
      {forgotPasswordDialog && (
        <>
          <DialogContent className="rounded-none">
            <DialogHeader>
              {/* Dialog Title */}
              <DialogTitle className="font-normal text-3xl rtl:text-start">
                Forgot your Password?
              </DialogTitle>
            </DialogHeader>

            <Form {...forgotPasswordForm}>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(forgotPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={forgotPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-full" placeholder="Enter Email" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </>
      )}

      {verifyCodeDialog && (
        <>
          <DialogContent className="rounded-none">
            <DialogHeader>
              {/* Dialog Title */}
              <DialogTitle className="font-normal text-3xl rtl:text-start">Verify Code</DialogTitle>
            </DialogHeader>

            <Form {...verifyCodeForm}>
              <form onSubmit={verifyCodeForm.handleSubmit(verifyCodeSubmit)} className="space-y-4">
                <FormField
                  control={verifyCodeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-full" placeholder="Enter Code" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </>
      )}

      {createNewPassword && (
        <>
          <DialogContent className="rounded-none">
            <DialogHeader>
              {/* Dialog Title */}
              <DialogTitle className="font-normal text-3xl rtl:text-start">Create new Password</DialogTitle>
            </DialogHeader>

            <Form {...createNewPasswordForm}>
              <form
                onSubmit={createNewPasswordForm.handleSubmit(createNewPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={createNewPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='password' className="w-full" placeholder="new password" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createNewPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" className="w-full" placeholder="confirm new password" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-full bg-custom-rose-700 hover:bg-custom-rose-500"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
