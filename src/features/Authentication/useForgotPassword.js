import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: sendResetEmail, isLoading } = useMutation({
    mutationFn: ({ email }) => forgotPassword({ email }),
    onSuccess: () => {
      toast.success("Reset link sent! Check your email.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send reset email");
    },
  });

  return { sendResetEmail, isLoading };
}
