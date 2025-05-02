import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCartPlus,
  FaBan,
} from "react-icons/fa";
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
    <div className="bg-white rounded-2xl w-[280px] hover:shadow-lg transition overflow-hidden border mb-5">
      {/* Product Image */}
      <Link to={`/product/${product.slug}`}>
        <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        
        {/* Product Name */}
        <Link to={`/product/${product.slug}`}>
          <p className="text-lg font-semibold hover:text-blue-500 text-gray-800 break-words line-clamp-2">
            {name}
          </p>
        </Link>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-bold">
              {formatCurrency(discountedPrice)}
            </span>

            {priceDiscount > 0 && (
              <span className="text-xs line-through text-gray-500">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          <button
            disabled={stockNo === 0 || isAdding}
            onClick={() => addToCart(product, 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition shrink-0 ${
              stockNo === 0
                ? "cursor-not-allowed text-gray-400"
                : "border border-black hover:text-blue-700"
            }`}
          >
            {stockNo === 0 ? "" : <FaCartPlus />}
          </button>
        </div>

        {/* Stock Info */}
        <div className="text-sm text-gray-700">
          {stockNo > 0 ? (
            <div className="flex items-center">{stockNo} in stock</div>
          ) : (
            <div className="flex items-center text-red-500">
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
          <span className="text-sm text-gray-500">No ratings yet</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
