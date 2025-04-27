// useLogin.js
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

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: async (data) => {
      setAuth(data?.token, data?.user);
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        try {
          await mergeGuestCartApi({ guestItems: guestCart });
          clearGuestCart();
          queryClient.invalidateQueries({
            queryKey: ["cart", data?.token],
            exact: true,
          });
          toast.success("Guest cart merged successfully!");
        } catch (error) {
          console.error("Guest cart merge failed", error);
        }
      }
      navigate("/", { replace: true });
      toast.success("Login successful!");
    },
    onError: (err) => {
      console.error("Login Error:", err.response?.data?.message || err.message);
      toast.error("Provided Email or Password is Incorrect");
    },
  });

  return { login, isLoading };
}
