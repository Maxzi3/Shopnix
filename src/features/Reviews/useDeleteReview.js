import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  const { mutate: removeReview, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["reviews"]); // 🔄 Correct key here
    },
    onError: (err) => console.log(err),
  });

  return { removeReview, isLoading: isPending };
}

