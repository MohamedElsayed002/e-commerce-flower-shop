"use client";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

export default function Subscribe() {
  // Translation
  const t = useTranslations();

  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: "Please enter your email" })
      .email(t("subscribe-email-invalid"))
      .nonempty(t("email-is-required")),
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
      <div className="flex relative text-[14px font-semibold] text-[#757F95]">
        {/* Input */}
        <Input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          className="pe-36"
          {...register("email")}
        />

        {/* Subscribe */}
        <Button
          type="submit"
          className="bg-[#F82BA9] rounded-[30px] absolute right-1 top-1/2  w-[131px] h-[90%] -translate-y-1/2 text-[16px] font-medium "
        >
          {/* Text */}
          {t("Subscribe")}

          {/* Icon */}
          <FaArrowRight size={15} />
        </Button>
      </div>

      {/* Feedback */}
      {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
    </form>
  );
}
