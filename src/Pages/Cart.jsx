import { useCartContext } from "../Contexts/CartContext";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi2";
import Spinner from "../UI/Spinner";
import SpinnerMini from "../UI/SpinnerMini";
import { formatCurrency } from "../UI/helpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
    isLoading,
    isDeleting,
    isUpdating,
    isClearing,
    updateCartSize,
    isUpdatingSize,
  } = useCartContext();

  // Get size options based on product category
  const getSizeOptions = (product) => {
    if (product.category === "jerseys") return ["S", "M", "L", "XL"];
    if (product.category === "shoes")
      return ["30", "32", "34", "36", "38", "40", "42", "44", "45"];
    if (product.category === "watches") return ["Small", "Medium", "Large"];
    return [];
  };

  // Handle size selection
  const handleSizeSelect = (cartItemId, size) => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    updateCartSize(cartItemId, size);
  };

  // Handle checkout with size validation
  const handleCheckout = () => {
    const hasMissingSize = cart.items.some((item) => !item.size);
    if (hasMissingSize) {
      toast.error("Please select a size for all items.");
      return;
    }
    navigate("/cart/orders/new");
  };

  if (isLoading || !cart) return <Spinner />;

  return (
    <div className="px-4 py-6 space-y-8 md:max-w-3xl mx-auto mb-[100px]">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart?.items?.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.items.map((item) => {
              const sizeOptions = getSizeOptions(item.product);

              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between border p-4 rounded-lg shadow-sm gap-4"
                >
                  {/* Left Section: Image + Info */}
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-28 h-28 md:w-20 md:h-20 object-cover rounded"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h2
                        className="font-medium max-w-[150px] md:max-w-[200px] truncate"
                        title={item.product.name}
                      >
                        {item.product.name}
                      </h2>
                      <p className="text-sm ">
                        {formatCurrency(item.product.price)} × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Total:{" "}
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                        {/* Size Selection */}
                        {sizeOptions.length > 0 && (
                          <div className="flex flex-row items-center py-2 gap-2">
                            <label
                              htmlFor={`size-${item._id}`}
                              className="text-sm font-medium"
                            >
                              Size:
                            </label>
                            <select
                              id={`size-${item._id}`}
                              value={item.size || ""}
                              onChange={(e) =>
                                handleSizeSelect(item._id, e.target.value)
                              }
                              disabled={isUpdatingSize}
                              className={`border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800  dark:text-gray-200 p-2   transition-all duration-300  rounded-md px-1 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-24 ${
                                isUpdatingSize
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <option value="">Size</option>
                              {sizeOptions.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Quantity + Delete */}
                  <div className="flex flex-row w-full justify-end gap-4 md:gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={isUpdating || item.quantity === 1}
                        className="disabled:cursor-not-allowed"
                        onClick={() =>
                          updateCartQuantity(
                            item._id,
                            item.quantity > 1 ? item.quantity - 1 : 1
                          )
                        }
                      >
                        <HiMinus className="w-8 h-8 border border-black dark:border-white  rounded-full p-1 disabled:text-gray-400 disabled:border-gray-400" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateCartQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <HiPlus className="w-8 h-8 border border-black dark:border-white rounded-full p-1" />
                      </button>
                    </div>
                    <button
                      disabled={isDeleting}
                      onClick={() => removeFromCart(item._id)}
                    >
                      <HiOutlineTrash className="w-6 h-6 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Displaying overall totals for the cart */}
          <p className="text-lg font-semibold">
            SubTotal: {formatCurrency(totalPrice)}
          </p>
          <p className="text-sm ">Total Quantity: {totalQuantity}</p>

          {/* Cart Summary */}

          <div className=" w-full p-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
            {isAuthenticated && (
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            )}
            <button
              disabled={isClearing}
              onClick={clearCart}
              className="bg-red-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
            >
              {isClearing ? (
                <div className="flex justify-center">
                  <SpinnerMini />
                </div>
              ) : (
                "Clear Cart"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
