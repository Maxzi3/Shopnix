import { useMutation } from "@tanstack/react-query";
import { updateMyPassword } from "../../Services/apiAuth";
import { toast } from "react-toastify";

export function useUpdatePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update password");
    },
  });

  return { updatePassword, isLoading };
}
