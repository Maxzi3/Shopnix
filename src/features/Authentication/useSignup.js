/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { useAuth } from "../../Contexts/AuthContext";

export function useSignup() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, phoneNumber, password, passwordConfirm }) =>
      signupUser({ fullName, email, phoneNumber, password, passwordConfirm }),
    onSuccess: (data) => {
      toast.success("Account created successfully!");
     setToken(data?.token);
     setUser(data?.user);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });

  return { signup, isLoading };
}
