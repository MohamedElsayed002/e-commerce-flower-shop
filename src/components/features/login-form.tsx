"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import useLogin from "@/hooks/auth/use-login";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  // Mutation
  const { isPending, error, login } = useLogin();

  // Form & validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    login(values);
  };

  return (
    <>
      {/* Toaster */}
      <Toaster />

      <div className="fixed inset-0 z-[10] bg-black bg-opacity-90 flex items-center justify-center transition-opacity">
        {/* Commmented out */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[608px] h-[478px] mx-auto p-[40px] flex flex-col mt-10 gap-[32px] bg-white shadow-md rounded-[20px]"
        >
          <div className="flex flex-col gap-[24px]">
            {/* Email Field */}
            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-[528px] h-[52px] text-[#797979] text-[16px] p-[8px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
                placeholder="Email"
              />
              {/* Email error message */}
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-[528px] h-[52px] p-[8px] text-[#797979] text-[16px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
                placeholder="Password"
              />
              {/* Password error message */}
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm font-semibold text-center">{error.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[528px] h-[50px] bg-[#F82BA9] text-white p-4 font-medium text-[16px] rounded-[30px]"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            {/* Close Button */}
            {/* <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:text-black block mx-auto"
            >
              Close
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
}
