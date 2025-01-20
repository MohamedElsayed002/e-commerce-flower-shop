'use client'
import React from "react";
import {z} from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFields, subscriptionSchema } from "@/lib/subscriptionSchema";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";



export default function Footer() {
  const t =useTranslations()
   const subscriptionSchema = z.object({
      email: z.string().email("Invalid email address").nonempty("Email is required"),
    });
  
     type EmailFields = z.infer<typeof subscriptionSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFields>({
    resolver: zodResolver(subscriptionSchema), 
  });
  const onSubmit: SubmitHandler<EmailFields> = (data) => {
    console.log("Submitted Data:", data);
   
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col items-center p-6"
      >
        <div className="flex pb-10 relative text-[14px font-semibold] text-[#757F95]">
        <Input
        id="email"
        type="email"
        placeholder="Enter Your Email"
        {...register("email")} 
        />
         
    <Button type="submit" className="bg-[#F82BA9] rounded-[30px] absolute right-0  w-[131px] h-[45px] text-[16px] font-bold ">{t('Supscribe')}
      <span>
      <IoArrowForwardSharp />
      </span>
    </Button>
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
        )}
      </form>
    </main>
  );
}