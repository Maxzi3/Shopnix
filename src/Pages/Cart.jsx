import { useCartContext } from "../Contexts/CartContext";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi2";
import Spinner from "../UI/Spinner";


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

  ;

  // const dummyCart = [
  //   {
  //     id: 1,
  //     name: "Nike Air Max",
  //     price: 18000,
  //     quantity: 2,
  //     image: "https://via.placeholder.com/80",
  //   },
  //   {
  //     id: 2,
  //     name: "Adidas Hoodie",
  //     price: 12000,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/80",
  //   },
  // ];
  if (isLoading) return <Spinner />;
  // console.log(cart)
  return (
    <div className="p-6 space-y-8 md:max-w-3xl max-h-screen mx-auto">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg shadow-sm space-y-4 md:space-y-0"
              >
                {/* Left Section: Image + Info */}
                <div className="flex gap-4 items-start md:items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2
                      className="font-medium max-w-[150px] truncate"
                      title={item.product.name}
                    >
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      ₦{item.product.price} × {totalQuantity}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      Total: ₦{item.product.price * item.product.quantity}
                    </p>
                  </div>
                </div>

                {/* Right Section: Quantity + Delete */}
                <div className="flex flex-col items-end gap-2 md:gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        updateCartQuantity(
                          item.product._id,
                          item.product.quantity > 1 ? item.product.quantity - 1 : 1
                        )
                      }
                    >
                      <HiMinus className="w-8 h-8 border border-black rounded-full p-1" />
                    </button>
                    <span className="w-6 text-center">{totalQuantity}</span>
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        updateCartQuantity(item.product._id, item.product.quantity + 1)
                      }
                    >
                      <HiPlus className="w-8 h-8 border border-black rounded-full p-1" />
                    </button>
                  </div>
                  <button
                    disabled={isDeleting}
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    <HiOutlineTrash className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            <p className="text-lg font-semibold">SubTotal:₦{totalPrice}</p>
          </div>

          {/* Cart Summary */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t md:static md:border-none p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <button className="bg-blue-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
            <button
              disabled={isClearing}
              onClick={clearCart}
              className="bg-red-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
