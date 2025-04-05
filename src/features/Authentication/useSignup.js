/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

export function useSignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorageState(null, "user"); // Store user in localStorage

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      setUser(data.user); // Store user data in local storage
      navigate("/home"); // Redirect user to homepage
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });

  return { registerUser, isLoading };
}
