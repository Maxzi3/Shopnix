import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCartPlus,
  FaBan,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
  const {
    name,

    price,
    priceDiscount, // now a percentage
    stockNo,
    imageUrl,
    ratingsAverage,
    ratingsQuantity,
  } = product;

  // Calculate discounted price
  const discountedPrice = price * (1 - priceDiscount / 100);

  // Render star ratings
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
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

  return (
    <div className="bg-white rounded-2xl w-[280px] hover:shadow-lg transition overflow-hidden">
      {/* Product Image */}
      <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

        {/* Price Section */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {priceDiscount > 0 && (
              <>
                <span className="text-xs line-through text-gray-500">
                  ${price.toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart or Out of Stock Button with Icons */}
          <button
            disabled={stockNo === 0}
            className={`w-[30px] h-[30px] flex items-center justify-center rounded-full animate-pulse transition ${
              stockNo === 0
                ? ""
                : "border-[1px] border-black hover:text-blue-700"
            }`}
          >
            {stockNo === 0 ? "" : <FaCartPlus />}
          </button>
        </div>
        {/* Stock */}
        <p className="text-sm text-gray-700">
          {stockNo > 0 ? (
            <div className="flex items-center">{stockNo} in stock</div>
          ) : (
            <div className="flex items-center text-red-500">
              <FaBan className="mr-2" />
              Out of Stock
            </div>
          )}
        </p>

        {/* Rating */}
        {renderStars(ratingsAverage)}
      </div>
    </div>
  );
};

export default ProductCard;
