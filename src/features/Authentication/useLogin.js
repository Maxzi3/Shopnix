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
      const guestCart = getGuestCart();

      if (guestCart.length > 0) {
        try {
          await mergeGuestCartApi({ guestItems: guestCart });
          clearGuestCart();
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        } catch (error) {
          console.error("Guest cart merge failed", error);
          toast.error("Failed to merge guest cart");
        }
      }

      setAuth({ user: data.data, token: data.token }); // Set token after merge
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
      toast.success("Login successful!");
    },
    onError: (err) => {
      toast.error(err.message || "Login failed");
    },
  });

  return { login, isLoading: isPending, error, status };
}
