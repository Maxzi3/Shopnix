import { useState, useEffect } from "react";
import { useUpdateReview } from "./useUpdateReview";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";


function EditReviewForm({ review, onClose }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const { editReview, isLoading } = useUpdateReview();

  useEffect(() => {
    if (review) {
      setText(review.review);
      setRating(review.rating);
    }
  }, [review]);

  const handleSubmit = () => {
    editReview({
      reviewId: review._id,
      review: text,
      rating,
    });
    onClose(); // Close modal after submission
  };

  const handleCancel = () => {
    onClose(); // Close modal on cancel
  };

  if (!review) return <h1>No review selected</h1>;

  return (
    <form className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-md"
      ></textarea>
      <FormInput
        type="number"
        id="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
      />
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {isLoading ? <SpinnerMini /> : "Save"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditReviewForm;
