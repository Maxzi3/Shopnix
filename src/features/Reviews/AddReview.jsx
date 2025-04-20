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
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Share your experience..."
          />
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
