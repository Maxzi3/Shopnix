import { useCreateOrder } from "../hooks/useCreateOrder";

function CheckoutPage({ cartItems, shippingAddress, totalAmount }) {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      })),
      shippingAddress,
      totalAmount,
    };

    createOrder(orderData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review & Place Order</h2>
      {/* Order summary here */}

      <button
        onClick={handlePlaceOrder}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
