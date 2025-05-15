import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../Services/apiAuth";
import { mergeGuestCartApi } from "../../Services/apiCart";
import { getGuestCart, clearGuestCart } from "../../Hooks/useLocalStorage";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    error,
    status,
  } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: async (data) => {
      localStorage.setItem("jwt", data?.token);
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        try {
          await mergeGuestCartApi({ guestItems: guestCart });
          clearGuestCart();
        } catch (error) {
          console.error("Guest cart merge failed", error);
          toast.error("Failed to merge guest cart");
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
      toast.success("Login successful!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading: isPending, error, status };
}
