import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const { mutate: editReview, isLoading } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      toast.success("Review updated!");
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => toast.error(err.message || "Could not update review"),
  });

  return { editReview, isLoading };
}
