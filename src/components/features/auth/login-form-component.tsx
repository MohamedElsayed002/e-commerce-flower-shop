"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Define input types for form fields
type Inputs = {
  email: string;
  password: string;
};

// Login function
export default function LoginForm() {
  const { register, handleSubmit } = useForm<Inputs>()
   const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

    const loginMutation = useMutation({
      mutationFn: async (values: Inputs) => {
        const response = await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/card",
          redirect: false,
        });
        if (!response?.ok) {
          throw new Error(response?.error || "Login failed");
        }
        return response;
      },
      onSuccess: (response) => {
        router.replace(response?.url || "/card");
      },
      onError: (error: any) => {
        setServerError(error.message);
      },
      // onError: (error) => {
      //   console.error("Login Error:", error.message);
      //   alert(error.message);
      // },
    });
  
    // Handle form submission
    const onSubmit: SubmitHandler<Inputs> = (values) => {
      loginMutation.mutate(values);
    };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[608px] h-[478px]  mx-auto p-[40px] flex flex-col mt-10 gap-[32px] bg-white shadow-md rounded-[20px]"
    >
      {/* Login Title */}
      <div>
        <p className="text-black font-normal text-[30px]">
          Login To Your Account
        </p>
      </div>

      <div className=" flex flex-col gap-[24px]">
        {/* Email Field */}
        <div>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-[528px] h-[52px] text-[#797979] text-[16px] p-[8px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
            placeholder="Email"
          />
           {/* {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p> */}
        {/* )} */}
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-[528px] h-[52px] p-[8px] text-[#797979] text-[16px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
            placeholder="Password"
          />
        </div>
      </div>

       {/* Server Error Message */}
       {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <div className="flex flex-col  gap-8 ">
        {/* Remember Me & Forgot Password Section */}
        <div className="flex justify-between p-2">
          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-[10px]">
            <input
              id="remind-me"
              type="checkbox"
              className="w-[15px] h-[15px] text-blue-600  border-[#414141] rounded-[3px] focus:ring-blue-500"
            />
            <label
              htmlFor="remind-me"
              className="text-[#313131] font-normal text-[14px]"
            >
              Remind me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div>
            <Link
              href="/auth/forgotpassword"
              className="text-[#F82BA9] underline font-semibold text-[14px]"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Sign Up Section */}
        <div>
          <p className="text-center text-black font-normal">
            No account?
            <Link href="/auth/register">
              {" "}
              <span className="text-[#F82BA9] underline font-semibold text-[14px]">
                {" "}
                Create one here
              </span>
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[528px] h-[50px] bg-[#F82BA9] text-white p-4 font-medium text-[16px] rounded-[30px]"
        >
          Login
        </button>
      </div>

    </form>
  );
}