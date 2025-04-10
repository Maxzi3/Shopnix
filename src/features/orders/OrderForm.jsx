import React, { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import Modal from "../../UI/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../UI/Constant";
import Pagination from "../../UI/Pagination";
import OrderDetails from "./OrderDetails";

const orders = [
  {
    id: "1",
    date: "2025-04-01",
    status: "Pending",
    total: 15000,
    items: [
      { name: "Item A", qty: 2, price: 5000 },
      { name: "Item B", qty: 1, price: 5000 },
    ],
  },
  {
    id: "2",
    date: "2025-03-20",
    status: "Delivered",
    total: 20000,
    items: [
      { name: "Item C", qty: 1, price: 10000 },
      { name: "Item D", qty: 2, price: 5000 },
    ],
  },
  {
    id: "3",
    date: "2025-03-15",
    status: "Cancelled",
    total: 12000,
    items: [{ name: "Item E", qty: 3, price: 4000 }],
  },
];

const statusBadge = {
  Pending: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const OrdersForm = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Pagination setup
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSearchParams({ page: 1 }); // reset page when filtering
          }}
          className="border px-3 py-2 rounded-md sm:w-auto"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="space-y-4">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="w-full md:w-2/3">
              <p className="font-medium text-gray-700">Order ID: #{order.id}</p>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
              <p
                className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-semibold ${
                  statusBadge[order.status]
                }`}
              >
                {order.status}
              </p>
            </div>

            <div className="mt-2 md:mt-0 flex flex-col md:items-end gap-2 w-full md:w-1/3">
              <p className="text-gray-800 font-semibold">
                Total: ₦{order.total.toLocaleString()}
              </p>
              <button
                onClick={() => navigate(`/account/order/${order.id}`)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <HiOutlineEye />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination count={filteredOrders.length} />
      </div>
    </div>
  );
};

export default OrdersForm;
