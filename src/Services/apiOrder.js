import { api } from "../UI/Constant"; // base Axios instance with auth/cookie

// 1. Create Order
export const createOrderApi = async (orderData) => {
  try {
    const { data } = await api.post("/order", orderData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

// 2. Get All Orders for the user
export const getUserOrdersApi = async () => {
  try {
    const { data } = await api.get("/order/my-orders", {
      withCredentials: true,
    });
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

// 3. Get a single order
export const getSingleOrderApi = async (orderId) => {
  try {
    const { data } = await api.get(`/order/${orderId}`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

// 4. Cancel order
export const cancelOrderApi = async (orderId) => {
  try {
    const { data } = await api.patch(
      `/order/${orderId}/cancel`,
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to cancel order");
  }
};
