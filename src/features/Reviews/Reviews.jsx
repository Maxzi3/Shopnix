import { FiEdit, FiTrash2 } from "react-icons/fi";

function Reviews() {
  const myReviews = [
    {
      id: 1,
      product: "Nike Air Max 90",
      rating: 5,
      comment: "Amazing quality and super comfy!",
      date: "April 10, 2025",
    },
    {
      id: 2,
      product: "Apple AirPods Pro",
      rating: 4,
      comment: "Great sound but battery drains fast.",
      date: "April 15, 2025",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">My Reviews</h1>

      {myReviews.map((review) => (
        <div key={review.id} className="border p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">{review.product}</h2>
            <span className="text-gray-500 text-sm">{review.date}</span>
          </div>

          <div className="flex items-center space-x-1">
            {Array.from({ length: review.rating }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>

          <p className="text-gray-700">{review.comment}</p>

          <div className="flex space-x-4 text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:text-blue-600">
              <FiEdit /> Edit
            </button>
            <button className="flex items-center gap-1 hover:text-red-600">
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
