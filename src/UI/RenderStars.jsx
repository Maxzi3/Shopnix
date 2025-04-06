const RenderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</span>
    </div>
  );
};

export default RenderStars;
