/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Services/apiAuth";
import useLocalStorage from "../../Hooks/useLocalStorageState"; 
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [token, setToken] = useLocalStorage("token", null); 

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      // Store user in cache
      queryClient.setQueryData(["user"], data?.user);

      // Store token using localStorage hook
      setToken(data?.token);

      // Redirect user to homepage
      navigate("/home", { replace: true });

      toast.success("Login successful!");
    },
    onError: (err) => {
      console.error("Login Error:", err.response?.data?.message || err.message);
      toast.error("Provided Email or Password is Incorrect");
    },
  });

  return { login, isLoading };
}
