import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCartPlus,
  FaBan,
} from "react-icons/fa";
import RenderStars from "../../UI/RenderStars";
import { useCartContext } from "../../Contexts/CartContext";

const ProductCard = ({ product }) => {
  const { isAdding, addToCart } = useCartContext();
  const {
    name,
    price,
    priceDiscount, // now a percentage
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
            disabled={stockNo === 0 || isAdding}
            onClick={() => addToCart(_id, 1)}
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
        <RenderStars
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />
      </div>
    </div>
  );
};

export default ProductCard;
