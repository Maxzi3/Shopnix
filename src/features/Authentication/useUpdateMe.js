import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../Services/apiAuth";
import { toast } from "react-toastify";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      queryClient.setQueryData(["user"], data.user); // Update user data in cache
    },
    onError: (err) => {
      toast.error(err.message || "Profile update failed");
    },
  });

  return { updateUser, isLoading };
}
