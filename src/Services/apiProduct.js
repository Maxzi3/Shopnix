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