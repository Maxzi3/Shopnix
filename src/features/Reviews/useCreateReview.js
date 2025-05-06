import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries(["reviews"]); // Refresh reviews after posting
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit review");
    },
  });

  return { submitReview, isLoading: isPending };
}
