import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/apiAuth";
import { mergeGuestCartApi } from "../../Services/apiCart";
import { toast } from "react-hot-toast";
import {
  getGuestCart,
  clearGuestCart,
} from "../../Hooks/useLocalStorage";
import { useAuth } from "../../Contexts/AuthContext";

export function useSignup() {
  const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setAuth } = useAuth();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, phoneNumber, password, passwordConfirm }) =>
      signupUser({ fullName, email, phoneNumber, password, passwordConfirm }),
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
        //  toast.success("Guest cart merged successfully!");
       } catch (error) {
         console.error("Guest cart merge failed", error);
       }
     }

      navigate("/");
      toast.success("Account created successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });

  return { signup, isLoading };
}
