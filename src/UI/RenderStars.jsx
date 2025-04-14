import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const RenderStars = ({ ratingsAverage, ratingsQuantity }) => {
  const full = Math.floor(ratingsAverage);
  const half = ratingsAverage % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(full)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {half && <FaStarHalfAlt />}
      {[...Array(empty)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
      <span className="ml-2 text-sm text-gray-600">{ratingsQuantity}+</span>
    </div>
  );
};
export default RenderStars;
