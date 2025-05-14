import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: deleteMe,
    onSuccess: async () => {
      await queryClient.clear(); 
      toast.success("Account deleted successfully!");
      navigate("/signup", { replace: true }); // Redirect to signup page
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete account");
    },
  });

  return { deleteAccount, isLoading: isPending };
}
