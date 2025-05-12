import { useMutation } from "@tanstack/react-query";
import { emailVerify } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useEmailVerification() {
  const navigate = useNavigate();
  const { mutate: verify, isPending } = useMutation({
    mutationFn: emailVerify,
    onSuccess: (data) => {
      if (data.status === "success") {
        if (data.verified) {
          navigate("/login?verified=true", { replace: true });
        } else if (data.alreadyVerified) {
          navigate("/login?alreadyVerified=true", { replace: true });
        }
      }
    },
    onError: (err) => {
      toast.error(err.message || "Email verification failed");
      navigate("/login?error=invalidToken", { replace: true });
    },
  });

  return { verify, isLoading: isPending };
}
