import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";

export function useResendEmail() {
  const { mutate: resend, isPending } = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      toast.success("Verification email resent.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to resend email.");
    },
  });

  return { resend, isLoading: isPending };
}
