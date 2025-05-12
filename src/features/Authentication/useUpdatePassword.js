import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateMyPassword } from "../../Services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: (data) => {
      // Update user data in query cache if returned
      if (data.data?.user) {
        queryClient.setQueryData(["user"], data.data.user);
      }
      // Invalidate user query to refresh authentication status
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password updated successfully!");
      navigate("/account/profile", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update password");
      // Handle unauthorized errors (e.g., invalid/expired token)
      if (
        err.message.includes("token") ||
        err.message.includes("Unauthorized")
      ) {
        queryClient.setQueryData(["user"], null); // Clear user data
        queryClient.invalidateQueries({ queryKey: ["user"] }); // Trigger recheck
        navigate("/login", { replace: true });
      }
    },
  });

  // Ensure mutation only runs if authenticated
  return {
    updatePassword,
    isLoading: isPending,
  };
}
