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
export async function getProductBySlug(productSlug) {
  try {
    const { data } = await api.get(`/products/${productSlug}`, {
      withCredentials: true,
    });
    return data; 
  } catch (error) {
    console.error("getProductBySlug - Error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
}