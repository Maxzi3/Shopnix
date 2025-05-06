import { useMutation } from "@tanstack/react-query";
import { emailVerify } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEmailVerification() {
  const navigate = useNavigate();

  const { mutate: verify, isPending} = useMutation({
    mutationFn: emailVerify,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Email verification failed");
    },
  });

  return { verify, isLoading: isPending };
}
