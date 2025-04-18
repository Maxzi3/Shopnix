import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateMyPassword } from "../../Services/apiAuth";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("token", null);

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: (data) => {
      if (data.token) setToken(data.token);
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
        setToken(null);
        navigate("/login");
      }
    },
  });

  return { updatePassword, isLoading };
}
