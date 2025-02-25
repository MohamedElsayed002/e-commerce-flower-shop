"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionMarkRight from "@/components/common/question-mark-right";
import { Link } from "@/i18n/routing";
import useRegister from "./_hooks/use-register-hook";

export default function RegisterForm() {
  // Translation
  const t = useTranslations();

  // Mutation 
  const {mutate : registerMutation , isPending : registerLoading} = useRegister()

  // Form & Validation
  const Schema = z
    .object({
      firstName: z
        .string({ required_error: t("firstname-required") })
        .min(2, t("first-name-must-be-at-least-2-characters")),
      lastName: z
        .string({ required_error: t("lastname-required") })
        .min(2, t("last-name-must-be-at-least-2-characters")),
      phone: z
        .string({ required_error: t("phone-number-required") })
        .regex(
          /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          t("invalid-phone-number-format-must-start-with-a-country-code"),
        ),
      email: z.string({ required_error: t("email-required") }).email(t("invalid-email-format")),
      gender: z.enum(["male", "female"], { required_error: t("gender-required") }),
      password: z
        .string({ required_error: t("password-required") })
        .min(8, t("password-must-be-at-least-8-characters"))
        .regex(/[A-Z]/, t("password-must-contain-at-least-one-uppercase-letter"))
        .regex(/[a-z]/, t("password-must-contain-at-least-one-lowercase-letter"))
        .regex(/[0-9]/, t("password-must-contain-at-least-one-number")),
      rePassword: z
        .string({ required_error: t("password-confirm-required") })
        .min(1, t("password-confirm-required")),
    })
    .refine((values) => values.password === values.rePassword, {
      message: t("password-confirm-mismatch"),
      path: ["confirm_password"],
    });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    registerMutation(values)
  };

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-lg rounded-[20px] p-8">
        {/* Text */}
        <h2 className="text-2xl mt-6">{t("create-account")}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("first-name")}
                      {...field}
                      className="w-[528px] h-[52px] rounded-[20px] mt-7"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder={t("last-name")}
                      type="text"
                      {...field}
                      className="w-[528px] h-[52px] rounded-[20px]"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone number */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder={t("phone-number")}
                      type="text"
                      {...field}
                      className="w-[528px] h-[52px] rounded-[20px]"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder={t("email")}
                      type="email"
                      {...field}
                      className="w-[528px] h-[52px] rounded-[20px]"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    {/* Select */}
                    <FormControl>
                      <SelectTrigger
                        className="w-[528px] h-[52px] rounded-[20px]"
                        style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                      >
                        <SelectValue placeholder={t("gender")} />
                      </SelectTrigger>
                    </FormControl>

                    {/* Select item */}
                    <SelectContent>
                      <SelectItem value="male">{t("male")}</SelectItem>
                      <SelectItem value="female">{t("female")}</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder={t("password")}
                      type="password"
                      {...field}
                      className="w-[528px] h-[52px] rounded-[20px]"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder={t("confirm-password")}
                      type="password"
                      {...field}
                      className="w-[528px] h-[48px] rounded-[20px]"
                      style={{ boxShadow: "0px 1px 10px 0px rgba(0 , 0 , 0 , 0.1)" }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <p className="text-center text-sm py-4 flex items-center justify-center">
              {/* Text */}
              {t("already-have-an-account")}

              {/* Icon */}
              <QuestionMarkRight />

              {/* Button */}
              <Link href={`/auth/login`} className="text-custom-rose-900">
                {t("login")}
              </Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-[528px] h-[50px] bg-custom-rose-900 text-white rounded-[30px]"
            >
              {t("create-account-button")}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
