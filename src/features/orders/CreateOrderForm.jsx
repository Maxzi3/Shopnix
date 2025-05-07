import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateOrder } from "./useCreateOrder";
import { useCartContext } from "../../Contexts/CartContext";
import { formatCurrency } from "../../UI/helpers";
import { useGetMe } from "../Authentication/useGetMe";
import SpinnerMini from "../../UI/SpinnerMini";

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    shippingAddress: "",
    paymentMethod: "Pay on delivery",
  });
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const deliveryFee = 2000;

  const { cart, totalPrice } = useCartContext();
  const { user } = useGetMe();
  const navigate = useNavigate();
  const { mutate: createOrder, isPending: isLoading } = useCreateOrder();

  const handleSubmit = (e) => {
    e.preventDefault();

    const addressToUse = useSavedAddress
      ? user?.address
      : formData.shippingAddress;

    if (!addressToUse) {
      toast.error("Please provide a shipping address.");
      return;
    }

    if (cart?.items?.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    console.log(formData, addressToUse);
    createOrder({ ...formData, shippingAddress: addressToUse });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 mb-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/cart")}
        className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
      >
        ← Back to Cart
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow p-6 space-y-6 h-96 overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>

          {/* Shipping Address Selection */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Shipping Address
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={useSavedAddress}
                  onChange={() => setUseSavedAddress(true)}
                  className="form-radio"
                />
                <span>
                  Use saved address: {user?.address || "No saved address"}
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!useSavedAddress}
                  onChange={() => setUseSavedAddress(false)}
                  className="form-radio"
                />
                <span>Use a different address</span>
              </label>
            </div>

            {!useSavedAddress && (
              <input
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Enter new delivery address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Pay on delivery">Pay on delivery</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-md font-semibold  transition disabled:opacity-50 text-center"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-gray-50 border rounded-xl shadow p-6 mb-16 h-96 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>

          {cart.items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li key={item.product._id} className="flex items-center gap-4">
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-700">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
              <hr />
              <li className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Delivery Fee:</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </li>
              <li className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total:</span>
                <span>{formatCurrency(totalPrice + deliveryFee)}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrderForm;
