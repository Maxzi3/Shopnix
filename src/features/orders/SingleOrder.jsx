import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleOrder } from "../orders/useGetSingleOrder ";
import Spinner from "../../UI/Spinner";
import { useCancelOrder } from "./useCancelOrder ";
import SpinnerMini from "../../UI/SpinnerMini";
import { HiTrash } from "react-icons/hi";
const statusBadge = {
  pending: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetSingleOrder(id);
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();

  if (isLoading)
    return (
      <div className="mt-10 text-lg text-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="mt-10 text-center text-red-500">Error loading order</div>
    );
  if (!order) return <div className="mt-10 text-center ">Order not found</div>;

  return (
    <div className="max-w-4xl px-4 py-24 mx-auto mb-10 lg:w-full lg:py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-6 transition rounded-md hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="p-4 mb-10 space-y-4 border shadow-md rounded-xl lg:p-6">
        <h2 className="flex-shrink-0 text-xl font-semibold text-blue-800 lg:text-2xl">
          #{order._id}
        </h2>

        <div className="grid gap-4 lg:grid-cols-2 gap-x-28">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium ">Status</h3>
            <p
              className={`text-sm  px-3 py-1 inline-block rounded ${
                statusBadge[order.orderStatus]
              }`}
            >
              {order.orderStatus}
            </p>
            {order.orderStatus === "pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                disabled={isCanceling}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiTrash className="w-5 h-5" />
                {isCanceling ? <SpinnerMini /> : "Cancel order"}
              </button>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Total</h3>
            <p className="text-lg font-semibold ">₦{order.totalPrice}</p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Shipping Address</h3>
            <p>{order.shippingAddress}</p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Payment Method</h3>
            <p className="">{order.paymentMethod}</p>
          </div>
        </div>

        <div>
          <h3 className="mt-6 mb-3 text-lg font-semibold">Items</h3>
          <ul className="space-y-3">
            {order.orderItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between p-3 border rounded "
              >
                <div>
                  <p className="font-medium ">
                    {item.name} <span>(Size: {item.size})</span>
                  </p>
                  <p className="text-sm ">
                    ₦{item.price} x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold ">₦{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
