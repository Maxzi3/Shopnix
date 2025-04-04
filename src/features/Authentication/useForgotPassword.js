/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../Services/apiAuth"
import { toast } from "react-toastify";

export function useForgotPassword() {
  const { mutate: sendResetEmail, isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success("Reset link sent! Check your email.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send reset email");
    },
  });

  return { sendResetEmail, isLoading };
}
