// Edit thi swhen te order backend is implemented

const OrderDetails = ({ selectedOrder }) => {
  return (
    <div>
      {/* <h1 >Booking {bookingId}</h1> */}
      {selectedOrder && (
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">
            Order #{selectedOrder?.id} Details
          </h2>
          <p className="mb-2 text-gray-600">
            <span className="font-medium">Status:</span> {selectedOrder?.status}
          </p>
          <p className="mb-2 text-gray-600">
            <span className="font-medium">Date:</span> {selectedOrder?.date}
          </p>
          <ul className="space-y-2 mb-4">
            {selectedOrder?.items.map((item, idx) => (
              <li
                key={idx}
                className="text-sm flex justify-between border-b pb-1"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₦{(item.price * item.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">
            Total: ₦{selectedOrder?.total.toLocaleString()}
          </p>
          {/* <button
            onClick={() => {
              setSelectedOrder(null);
              setIsModalOpen(false);
            }}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button> */}
        </div>
      )}
    </div>
  );
};

export default OrderDetails