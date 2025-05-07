import Button from "../../UI/Button";
import SpinnerMini from "../../UI/SpinnerMini";
import StarRating from "../../UI/StarRating";

const AddReview = ({
  reviewText,
  setReviewText,
  setRating,
  handleReviewSubmit,
  isCreating,
}) => {
  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Rating</label>
          <StarRating setUserRating={setRating} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Your Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-md"
            placeholder="Share your experience..."
          />
        </div>
        <Button variant="primary" type="submit" disabled={isCreating}>
          {isCreating ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
