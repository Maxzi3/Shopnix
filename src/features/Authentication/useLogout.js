import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logoutUser } from "../../Services/apiAuth";
import { useAuth } from "../../Contexts/AuthContext";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth } = useAuth();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser, 
    onSuccess: () => {
      clearAuth(); // Clear token and user
      queryClient.invalidateQueries({ queryKey: ["cart"] }); 
      navigate("/login", { replace: true });
      toast.success("Logged out successfully!");
    },
    onError: (err) => {
      console.error(
        "Logout Error:",
        err.response?.data?.message || err.message
      );
      toast.error("Failed to log out");
    },
  });

  return { logout, isLoading };
}
