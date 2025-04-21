import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../Services/apiAuth";
import { useAuth } from "../../Contexts/AuthContext";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setToken, setUser } = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      setToken(data?.token);
      setUser(data?.user);

      queryClient.invalidateQueries({ queryKey: ["cart"] });

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
