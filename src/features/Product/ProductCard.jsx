import { FaCartPlus, FaBan } from "react-icons/fa";
import RenderStars from "../../UI/RenderStars";
import { useCartContext } from "../../Contexts/CartContext";
import { formatCurrency } from "../../UI/helpers";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { isAdding, addToCart } = useCartContext();
  const {
    name,
    price,
    priceDiscount,
    stockNo,
    imageUrl,
    ratingsAverage,
    ratingsQuantity,
    _id,
  } = product;

  // Calculate discounted price
  const discountedPrice = price * (1 - priceDiscount / 100);

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg transition overflow-hidden border dark:border-gray-700 w-full h-full flex flex-col min-h-[300px]">
      {/* Product Image */}
      <Link to={`/product/${product.slug}`}>
        <img
          src={imageUrl}
          alt={name}
          className="object-contain w-full h-48 bg-white dark:bg-gray-700"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow gap-2 p-4">
        <Link to={`/product/${product.slug}`}>
          <p className="text-lg font-semibold text-gray-800 break-words hover:text-blue-500 dark:hover:text-blue-500 dark:text-gray-100 line-clamp-2">
            {name}
          </p>
        </Link>

        {/* Price Section */}

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {formatCurrency(discountedPrice)}
            </span>
            {priceDiscount > 0 && (
              <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                {formatCurrency(price)}
              </span>
            )}
          </div>
          <button
            disabled={stockNo === 0 || isAdding}
            onClick={() => addToCart(product, 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition shrink-0 absolute right-3 bottom-12 md:bottom-8 ${
              stockNo === 0
                ? "cursor-not-allowed text-gray-400"
                : "border border-black dark:border-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
            }`}
          >
            {stockNo === 0 ? "" : <FaCartPlus />}
          </button>
        </div>

        {/* Stock Info */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {stockNo > 0 ? (
            <div className="flex items-center">{stockNo} in stock</div>
          ) : (
            <div className="flex items-center text-red-500 dark:text-red-400">
              <FaBan className="mr-1" />
              Out of Stock
            </div>
          )}
        </div>

        {/* Ratings */}
        {ratingsQuantity > 0 ? (
          <RenderStars
            ratingsAverage={ratingsAverage}
            ratingsQuantity={ratingsQuantity}
          />
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            No ratings yet
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
