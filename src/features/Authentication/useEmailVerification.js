import { useMutation } from "@tanstack/react-query";
import { emailVerify } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export function useEmailVerification() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { mutate: verify, isPending } = useMutation({
    mutationFn: emailVerify,
    onSuccess: (data) => {
      setAuth(data?.token, data?.user);
      toast.success("Email verified successfully!");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Email verification failed");
    },
  });

  return { verify, isLoading: isPending };
}
