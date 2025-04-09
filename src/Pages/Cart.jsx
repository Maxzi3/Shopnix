import { useCart } from "../features/Cart/useCart";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi2";


const CartPage = () => {
  const { increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCart();
  const dummyCart = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 18000,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Adidas Hoodie",
      price: 12000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];
  return (
    <div className="p-6 space-y-8 md:max-w-3xl max-h-screen mx-auto">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {dummyCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {dummyCart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg shadow-sm space-y-4 md:space-y-0"
              >
                {/* Left Section: Image + Info */}
                <div className="flex gap-4 items-start md:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2
                      className="font-medium max-w-[150px] truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      ₦{item.price.toLocaleString()} × {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      Total: ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right Section: Quantity + Delete */}
                <div className="flex flex-col items-end gap-2 md:gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      <HiMinus className="w-8 h-8 border border-black rounded-full p-1" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>
                      <HiPlus className="w-8 h-8 border border-black rounded-full p-1" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)}>
                    <HiOutlineTrash className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            <p className="text-lg font-semibold">
              {/* Total: ₦{totalPrice.toLocaleString()} */}
              SubTotal: ₦100000
            </p>
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pb-[200px]">
            <button className="bg-blue-600 text-white w-full md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
            <button
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
