"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import ArrowRight from "@/components/common/arrow-long-right";

export default function Subscribe() {
  // Translation
  const t = useTranslations();

  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: t("please-enter-your-email") })
      .email(t("subscribe-email-invalid"))
      .nonempty(t("please-enter-your-email")),
  });

  type Inputs = z.infer<typeof Schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="flex relative text-sm font-semibold text-blue-gray-500 ">
        {/* Input */}
        <Input
          id="email"
          type="email"
          placeholder={t("enter-your-email")}
          className="ltr:placeholder:text-left rtl:placeholder:text-right text-left rtl:text-right  "
          {...register("email")}
        />

        {/* Subscribe */}
        <Button
          type="submit"
          className="bg-custom-rose-900  rounded-[30px] absolute ltr:right-1 rtl:left-1   top-1/2  w-[131px] h-[90%] -translate-y-1/2 text-[16px] font-medium "
        >
          {/* Text */}
          {t("Subscribe")}

          {/* Icon */}
          {/* Arrow right icon for ltr */}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      {/* Feedback */}
      {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
    </form>
  );
}
