"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

export default function RegisterForm({
  onStateChange,
}: {
  onStateChange: (state: AuthFormState) => void;
}) {
  // Translations
  const t = useTranslations();

  // Login Schema
  const Schema = z.object({
    email: z
      .string({ required_error: t("email-reqired") })
      .min(1, t("email-reqired"))
      .email(t("email-invalid")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });

  // Type Zod
  type Inputs = z.infer<typeof Schema>;

  // Set initial empty values for
  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Schema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      {/* Title Register */}
      <DialogTitle className="text-left mb-7 font-normal text-2xl rtl:text-right ms-2 rtl:me-2 ">
        Create account
      </DialogTitle>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Filed */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full border-none shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="text" placeholder="First Name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name*/}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full border-none  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="text" placeholder="Last Name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email*/}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full border-none  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="email" placeholder={t("email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email*/}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full border-none  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="password" placeholder={t("password")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Register link */}
        <div className="flex flex-col gap-2 text-sm text-center">
          <div className="text-gray-600">
            Already have an account? {""}
            <Button
              variant="link"
              className="text-custom-rose-900 p-0  underline"
              onClick={() => onStateChange("login")}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full rounded-3xl bg-custom-rose-900 hover:bg-custom-rose-800  "
        >
          Create Account{" "}
        </Button>
      </form>
    </Form>
  );
}
