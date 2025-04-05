import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: reset, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! Please login.");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset password");
    },
  });

  return { reset, isLoading };
}
