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
  const { setAuth } = useAuth();

  const {
    mutate: login,
    isPending,
    error,
    status,
  } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: async (data) => {
      setAuth(data.user);
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        try {
          await mergeGuestCartApi({ guestItems: guestCart });
          clearGuestCart();
          queryClient.invalidateQueries({
            queryKey: ["cart"],
            exact: true,
          });
          // toast.success("Guest cart merged successfully!");
        } catch (error) {
          console.error("Guest cart merge failed", error);
        }
      }
      navigate("/", { replace: true });
      toast.success("Login successful!");
      navigate(0);  // Force refresh to update AuthContext
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading: isPending, error, status };
}
