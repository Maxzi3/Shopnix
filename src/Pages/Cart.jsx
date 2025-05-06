import { useCartContext } from "../Contexts/CartContext";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi2";
import Spinner from "../UI/Spinner";
import SpinnerMini from "../UI/SpinnerMini";
import { formatCurrency } from "../UI/helpers";

const CartPage = () => {
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
  } = useCartContext();
 

  if (isLoading || !cart) return <Spinner />;

  return (
    <div className="px-6 md:pt-4 space-y-8 md:max-w-3xl max-h-auto mx-auto mb-[100px] ">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart?.items?.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg shadow-sm space-y-4 md:space-y-0"
              >
                {/* Left Section: Image + Info */}
                <div className="flex gap-4 items-start md:items-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="md:w-20 w-28 h-28 md:h-20 object-cover md:object-scale-down rounded"
                  />
                  <div>
                    <h2
                      className="font-medium max-w-[150px] truncate"
                      title={item.product.name}
                    >
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.product.price)} × {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      Total:{formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>

                {/* Right Section: Quantity + Delete */}
                <div className="flex flex-col items-end gap-2 md:gap-4">
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
                      <HiMinus className="w-8 h-8 border border-black rounded-full p-1 disabled:text-gray-400 disabled:border-gray-400" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        updateCartQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <HiPlus className="w-8 h-8 border border-black rounded-full p-1" />
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
            ))}

            {/* Displaying overall totals for the cart */}
            <p className="text-lg font-semibold">
              SubTotal:{formatCurrency(totalPrice)}
            </p>
            <p className="text-sm text-gray-600">
              Total Quantity: {totalQuantity}
            </p>
          </div>

          {/* Cart Summary */}
          <div className=" w-full bg-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
            <button className="bg-blue-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
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
