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
      <div className="text-center mt-10 text-lg">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">Error loading order</div>
    );
  if (!order)
    return (
      <div className="text-center mt-10 ">Order not found</div>
    );

  return (
    <div className="max-w-4xl md:w-full mx-auto px-4 md:py-6 py-24 mb-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2  hover:bg-gray-300  rounded-md transition"
      >
        ← Back
      </button>

      <div className="rounded-xl shadow-md md:p-6 p-4 space-y-4 border mb-10">
        <h2 className="md:text-2xl text-xl flex-shrink-0 font-semibold text-blue-800">
         #{order._id}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-28 gap-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium ">
              Status
            </h3>
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
            <h3 className="text-lg font-medium  mb-2">Total</h3>
            <p className=" text-lg font-semibold">
              ₦{order.totalPrice}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium  mb-2">
              Shipping Address
            </h3>
            <p >{order.shippingAddress}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium  mb-2">
              Payment Method
            </h3>
            <p className="">{order.paymentMethod}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold  mt-6 mb-3">
            Items
          </h3>
          <ul className="space-y-3">
            {order.orderItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border rounded p-3 "
              >
                <div>
                  <p className="font-medium ">{item.name}</p>
                  <p className="text-sm ">
                    ₦{item.price} x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold ">
                  ₦{item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
