import { api } from "../UI/Constant";


// PRODUCTS
export async function getProducts() {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
}
export async function getProductById(productId) {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
}

// CART
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post("/cart", { product: productId, quantity });
  return response.data;
};