import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateOrder } from "./useCreateOrder";
import { useCartContext } from "../../Contexts/CartContext";
import { formatCurrency } from "../../UI/helpers";
import { useGetMe } from "../Authentication/useGetMe";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";
import Button from "../../UI/Button";

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
        className="mb-6 flex items-center gap-2 text-sm transition"
      >
        ← Back to Cart
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className=" border rounded-xl shadow p-6 space-y-6 h-96 overflow-y-auto"
        >
          <h2 className="text-2xl font-bold">Checkout</h2>

          {/* Shipping Address Selection */}
          <div className="space-y-2">
            <label className="block font-medium">Shipping Address</label>

            <div className="flex flex-col gap-2 ">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={useSavedAddress}
                  onChange={() => setUseSavedAddress(true)}
                />
                <p>
                  Use saved address{" "}
                  <span className="text-green-600 max-w-[150px] truncate">
                    {" "}
                    {user?.address || "No saved address"}
                  </span>
                </p>
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
              <FormInput
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Enter new delivery address"
                required
              />
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1  font-medium">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Pay on delivery">Pay on delivery</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Place Order"
            )}
          </Button>
        </form>

        {/* Cart Summary */}
        <div className="border rounded-xl shadow p-6 mb-16 h-96 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
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
                    <h4 className="text-sm font-medium">{item.product.name}</h4>
                    <p className="text-sm">
                      {item.quantity} x {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
              <hr />
              <li className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </li>
              <li className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </li>
              <li className="flex justify-between font-bold text-lg">
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
