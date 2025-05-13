import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateMyPassword } from "../../Services/apiAuth";
import { useAuth } from "../../Contexts/AuthContext";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: (data) => {
      if (data.token) setAuth(data.token);
      if (data.data?.user) queryClient.setQueryData(["user"], data.data.user);
      toast.success("Password updated successfully!");
      navigate("/account/profile", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
      if (
        err.message.includes("token") ||
        err.message.includes("Unauthorized")
      ) {
        setAuth(null);
        navigate("/login");
      }
    },
  });

  return { updatePassword, isLoading: isPending };
}
