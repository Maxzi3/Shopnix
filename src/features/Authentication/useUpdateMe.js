import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateMe,

    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      queryClient.setQueryData(["user"], data.data.user); // Update cached user data immediately
    },

    onError: (err) => {
      toast.error(err.message || "Profile update failed");
    },

    // Runs whether it’s a success or an error
    onSettled: () => {
      queryClient.invalidateQueries(["user"]); // Refetch latest user data from server
    },
  });

  return { updateUser, isUpdating };
}
