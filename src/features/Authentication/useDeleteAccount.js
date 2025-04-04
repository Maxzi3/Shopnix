import { useMutation } from "@tanstack/react-query";
import { deleteMe } from "../../Services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const navigate = useNavigate();
  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      toast.success("Account deleted successfully!");
      localStorage.removeItem("jwt"); // Remove token (if stored)
      navigate("/signup", { replace: true }); // Redirect to signup page
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete account");
    },
  });

  return { deleteAccount, isLoading };
}
