import { api } from "../UI/Constant";
export async function getUserCart() {
  try {
    const { data } = await api.get("/cart");
    return data;
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
export async function mergeGuestCartApi(guestCart) {
  try {
    const { data } = await api.post("/cart/merge", guestCart);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Merge cart");
  }
}
export const updateCartSizeApi = async (cartItemId, size) => {
  try {
console.log("updateCartSize called with:", {
  cartItemId,
  size,
  type: typeof cartItemId,
});
    const { data } = await api.patch(`/cart/update-size/${cartItemId}`, {
      size,
    });
      console.log("updateCartSize called with:", {
        cartItemId, size,
        type: typeof cartItemId,
      });
    console.log(`/cart/update-size/${cartItemId}`);
    return data;
  } catch (error) {
    console.error(error)
    throw new Error(error.response?.data?.message || "Failed to Update size");
  }
};
