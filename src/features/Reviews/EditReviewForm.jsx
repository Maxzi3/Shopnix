import { useState } from "react";
import { useUpdateReview } from "./useUpdateReview";

function EditReviewForm({ review, onClose }) {
  const [text, setText] = useState(review.review);
  const [rating, setRating] = useState(review.rating);
  const { updateReview, isLoading } = useUpdateReview();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(
      { id: review._id, data: { review: text, rating } },
      { onSuccess: onClose }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full rounded"
      ></textarea>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
        className="border p-2 w-16 rounded"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default EditReviewForm;
