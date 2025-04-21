import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";

export function useLogout() {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // Remove token
      setToken(null);
      localStorage.removeItem("token"); // 👈 force removal

      // Clear React Query cache
      queryClient.clear();

      // Optionally: toast message
      toast.success("Logged out successfully");

      // Redirect to login
      navigate("/login");
    },

    onError: (err) => {
      toast.error(err.message || "Logout failed");
    },
  });

  return { logout, isPending };
}
