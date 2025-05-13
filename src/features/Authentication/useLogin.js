import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../Services/apiAuth";
import { mergeGuestCartApi } from "../../Services/apiCart";
import { getGuestCart, clearGuestCart } from "../../Hooks/useLocalStorage";
import { useAuth } from "../../Contexts/AuthContext";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login: setAuth } = useAuth();

  const {
    mutate: login,
    isPending,
    error,
    status,
  } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: async (data) => {
     setAuth({ user: data.data, token: data.token }); // Set user and token in context
     queryClient.invalidateQueries({ queryKey: ["user"] });
      const guestCart = getGuestCart(); // Clear ongoing fetch requests
      if (guestCart.length > 0) {
        try {
          await mergeGuestCartApi({ guestItems: guestCart }); // Merge guest cart
          clearGuestCart(); // Clear guest cart
          queryClient.invalidateQueries({ queryKey: ["cart"] }); // Invalidate cart query
          // toast.success("Guest cart merged successfully!");
        } catch (error) {
          console.error("Guest cart merge failed", error);
          toast.error("Failed to merge guest cart");
        }
      }
      queryClient.setQueryData(["user"], data.user); // Optimistically update user data
      navigate("/", { replace: true });
      toast.success("Login successful!");
    },
    onError: (err) => {
      toast.error(err.message || "Login failed");
    },
  });

  return { login, isLoading: isPending, error, status };
}
