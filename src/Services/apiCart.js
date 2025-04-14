import { api } from "../UI/Constant";
export async function getUserCart() {
  try {
    const { data } = await api.get("/cart");
    return data.data.cart.items;;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
}
export async function addToCart(productId, quantity) {
  try {
    const { data } = await api.post("/cart", { productId, quantity });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
}
export async function updateCart({ itemId, quantity }) {
  try {
    const { data } = await api.patch(`/cart/${itemId}`, {
      quantity,
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update Product"
    );
  }
}
export async function deleteCartItem(itemId) {
  try {
    const { data } = await api.delete(`/cart/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete cart");
  }
}
export async function clearCart() {
  try {
    const { data } = await api.delete("/cart");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
}