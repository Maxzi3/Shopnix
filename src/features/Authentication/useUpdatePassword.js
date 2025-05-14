import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateMyPassword } from "../../Services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); 
      toast.success("Password updated successfully!");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
      if (
        err.message.includes("token") ||
        err.message.includes("Unauthorized")
      ) {
        navigate("/login");
      }
    },
  });

  return { updatePassword, isLoading: isPending };
}
