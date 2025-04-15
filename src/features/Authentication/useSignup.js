/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export function useSignup() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage(null, "user"); // Store user in localStorage

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, phoneNumber, password, passwordConfirm }) =>
      signupUser({ fullName, email, phoneNumber, password, passwordConfirm }),
    onSuccess: (user) => {
      toast.success("Account created successfully!");
      setUser(user); // Store user data in local storage
      navigate("/"); 
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });

  return { signup, isLoading };
}
