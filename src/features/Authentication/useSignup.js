import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";


export function useSignup() {
  const navigate = useNavigate();
   
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ fullName, email, phoneNumber, password, passwordConfirm }) =>
      signupUser({ fullName, email, phoneNumber, password, passwordConfirm }),
    onSuccess: async () => {
      navigate("/login");
      toast.success("Account created! Check Your Email to verify");
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });

  return { signup, isLoading: isPending };
}
