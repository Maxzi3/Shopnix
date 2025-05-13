import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logoutUser } from "../../Services/apiAuth";
import { useAuth } from "../../Contexts/AuthContext";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear(); // Clear all queries
      queryClient.setQueryData(["user"], null);
      clearAuth();
      navigate("/", { replace: true });
      toast.success("Logged out successfully!");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return { logout, isLoading: isPending };
}
