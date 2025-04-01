import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import FeedbackMessage from "@/components/common/feedback-message";

type ForgotPasswordFormProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onStateChange: (state: AuthFormState) => void;
};

export default function ForgotPasswordForm({ setEmail, onStateChange }: ForgotPasswordFormProps) {
  // Translations
  const t = useTranslations();

  const {
    mutate: forgotPasswordMutate,
    isPending: forgotPasswordLoading,
    error: forgotPasswordError,
  } = useForgotPassword();

  // Form and Validation
  const formSchema = z.object({
    email: z.string().email({ message: t("invalid-email") }),
  });

  const emailForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Functions
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    forgotPasswordMutate(values.email, {
      onSuccess: () => {
        onStateChange("verify-otp");
        setEmail(values.email);
      },
    });
  };

  return (
    <Form {...emailForm}>
      <form onSubmit={emailForm.handleSubmit(handleSubmit)} className="space-y-4 min-w-96">
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* Email Input */}
                <Input className="w-full" placeholder={t("enter-your-email-address")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback */}
        <FeedbackMessage message={forgotPasswordError?.message} />

        {/* Submit Button */}
        <Button
          disabled={forgotPasswordLoading}
          className="w-full bg-custom-rose-700 hover:bg-custom-rose-500"
          type="submit"
        >
          {t("recover-password")}
        </Button>
      </form>
    </Form>
  );
}
