import React, { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../UI/Constant";
import Pagination from "../../UI/Pagination";
import { useGetUserOrders } from "./useGetUserOrders";
import { useCancelOrder } from "./useCancelOrder ";
import { formatCurrency, formatDate } from "../../UI/helpers";
import { HiTrash } from "react-icons/hi2";
import SpinnerMini from "../../UI/SpinnerMini";
import Spinner from "../../UI/Spinner";
import { FiX } from "react-icons/fi";

const statusBadge = {
  pending: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const UserOrders = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useGetUserOrders();
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();

  const filteredOrders = Array.isArray(orders)
    ? filter === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === filter.toLowerCase())
    : [];

  // Pagination setup
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedOrders = Array.isArray(filteredOrders)
    ? filteredOrders.slice(startIndex, startIndex + PAGE_SIZE)
    : [];
  if (isLoading)
    return (
      <div className="flex justify-center ">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="px-4">Error loading orders: {error.message}</div>;
  if (!orders || orders.length === 0)
    return <div className="px-4">No orders found</div>;

  // Check if filtered orders are empty for the selected filter
  const noFilteredOrders =
    filteredOrders.length === 0 && filter !== "All" && orders.length > 0;

  return (
    <div className="w-full mx-auto px-4 md:py-2 py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        {orders.length > 1 && (
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSearchParams({ page: "1" });
            }}
            className="border px-3 py-2  dark:bg-gray-900 dark:text-white text-gray-700 rounded-md sm:w-auto"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )}
      </div>

      {/* No Filtered Orders Message */}
      {noFilteredOrders && (
        <div className="text-center  mb-4">
          No orders found for {filter} status
        </div>
      )}

      {/* Orders Table */}
      <div className="space-y-10">
        {paginatedOrders.length > 0
          ? paginatedOrders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 shadow-sm flex flex-col justify-between items-start md:w-10/12 md:justify-self-end "
              >
                <p className=" font-medium text-base shrink-0 text-blue-600 ">
                  ID: #{order._id}
                </p>
                <div className="w-full flex flex-row items-center justify-between space-y-4">
                  <p className="text-sm ">
                    Date: {formatDate(order.createdAt)}
                  </p>
                  <p
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      statusBadge[order.orderStatus]
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                </div>

                <div className=" mt-2 md:mt-0 flex flex-col gap-2 w-full">
                  <p className="font-semibold">
                    Total: {formatCurrency(order.totalPrice)}
                  </p>
                  <div className="flex flex-row  justify-between">
                    <button
                      onClick={() => navigate(`/account/orders/${order._id}`)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <HiOutlineEye />
                      View Details
                    </button>
                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={isCanceling}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiX size={18} /> Cancel
                        {/* <HiTrash className="w-5 h-5" /> */}
                        {isCanceling ? <SpinnerMini /> : " "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          : !noFilteredOrders && (
              <div className="text-center ">No orders to display</div>
            )}
      </div>

      {/* Pagination */}
      {paginatedOrders.length > 0 && (
        <div className="mt-8">
          <Pagination count={filteredOrders.length} />
        </div>
      )}
    </div>
  );
};

export default UserOrders;
