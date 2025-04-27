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
// import { useGetMe } from "../Authentication/useGetMe";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { isAdding, addToCart } = useCartContext();
  // const { isAuthenticated } = useGetMe();
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
    <Link
      // to={`/product/${product.slug}`}
      className="bg-white rounded-2xl w-[280px] hover:shadow-lg transition overflow-hidden border mb-5"
    >
      {/* Product Image */}
      <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold hover:text-blue-500 text-gray-800">
          {name}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">
              {formatCurrency(discountedPrice)}
            </span>
            {priceDiscount > 0 && (
              <>
                <span className="text-xs line-through text-gray-500">
                  {formatCurrency(price)}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart or Out of Stock Button with Icons */}

          <button
            disabled={stockNo === 0 || isAdding}
            onClick={() => addToCart(product, 1)}
            className={`w-[30px] h-[30px] flex items-center justify-center rounded-full transition ${
              stockNo === 0
                ? "cursor-not-allowed text-gray-400"
                : "border border-black hover:text-blue-700"
            }`}
          >
            {stockNo === 0 ? "" : <FaCartPlus />}
          </button>
        </div>

        {/* Stock */}
        <div className="text-sm text-gray-700">
          {stockNo > 0 ? (
            <div className="flex items-center">{stockNo} in stock</div>
          ) : (
            <div className="flex items-center text-red-500">
              <FaBan className="mr-2" />
              Out of Stock
            </div>
          )}
        </div>

        {/* Rating */}
        {ratingsQuantity > 0 ? (
          <RenderStars
            ratingsAverage={ratingsAverage}
            ratingsQuantity={ratingsQuantity}
          />
        ) : (
          <span className="text-sm text-gray-500">No ratings yet</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
