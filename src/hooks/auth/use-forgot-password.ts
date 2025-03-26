"use client"

import { forgotPasswordAction } from "@/lib/actions/auth/forgot-password.action"
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useForgotPassword() {

    // Translation
    const t = useTranslations();

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (email: string) => {
            const payload = await forgotPasswordAction(email)

            if ("error" in payload) {
                throw new Error(typeof payload.error === "string" ? payload.error : t('an-unknown-error-occurred'))
            }

            return payload
        },
        onSuccess: () => {
            toast.success(t("check your email address. OTP Send"))
        },
    })

    return {
        mutate,
        isPending,
        error
    }
}