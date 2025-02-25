"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "sonner";
// import Link from "next/link";
import useLogin from "../../../../hooks/auth/use-login";

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

  //This ui part i created to test only!
  return (
    <>
      {/* Toaster for Notifications */}
      <Toaster position="top-center" />

      <div className="fixed inset-0 z-[10] bg-black bg-opacity-90 flex items-center justify-center transition-opacity">
        {/* <div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[608px] h-[478px] mx-auto p-[40px] flex flex-col mt-10 gap-[32px] bg-white shadow-md rounded-[20px]"
        >
          {/* Login Title */}
          {/* <p className="text-black font-normal text-[30px]">Login To Your Account</p> */}

          <div className="flex flex-col gap-[24px]">
            {/* Email Field */}
            <div>
              {/* <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-[528px] h-[52px] text-[#797979] text-[16px] p-[8px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
                  placeholder="Email"
                /> */}
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              {/* <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-[528px] h-[52px] p-[8px] text-[#797979] text-[16px] font-normal border rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
                  placeholder="Password"
                /> */}
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          {/* <div className="flex flex-col gap-8"> */}
          {/* Remember Me & Forgot Password Section */}
          {/* <div className="flex justify-between p-2">
                <div className="flex items-center gap-[10px]">
                  <input
                    id="remind-me"
                    type="checkbox"
                    className="w-[15px] h-[15px] text-blue-600 border-[#414141] rounded-[3px] focus:ring-blue-500"
                  />
                  <label htmlFor="remind-me" className="text-[#313131] font-normal text-[14px]">
                    Remind me
                  </label>
                </div>
                <Link href="#" className="text-[#F82BA9] underline font-semibold text-[14px]">
                  Forgot Password
                </Link>
              </div> */}

          {/* Sign Up Section */}
          {/* <p className="text-center text-black font-normal">
                No account?
                <Link href="#" className="text-[#F82BA9] underline font-semibold text-[14px]">
                  {" "}
                  Create one here
                </Link>
              </p> */}

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-semibold text-center">{error.message}</p>
          )}

          {/* Submit Button */}
          {/* <button
                type="submit"
                className="w-[528px] h-[50px] bg-[#F82BA9] text-white p-4 font-medium text-[16px] rounded-[30px]"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </button> */}

          {/* Close Button */}
          {/* <button
                onClick={closeModal}
                className="mt-4 text-gray-500 hover:text-black block mx-auto"
              >
                Close
              </button> */}
          {/* </div> */}
        </form>
        {/* </div> */}
      </div>
    </>
  );
}
