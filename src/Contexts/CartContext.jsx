import { createContext, useContext, useMemo } from "react";

import { useCart } from "../features/Cart/useCart";
import { useAddToCart } from "../features/Cart/useAddToCart";
import { useUpdateCartItem } from "../features/Cart/useUpdateCartItem";
import { useDeleteCartItem } from "../features/Cart/useDeleteCartItem";
import { useClearCart } from "../features/Cart/useClearCart";

// Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: cart = [], isLoading } = useCart();
  
  const { addItem, isLoading: isAdding } = useAddToCart();
  const { deleteItem, isLoading: isDeleting } = useDeleteCartItem();
  const { updateItem, isLoading: isUpdating } = useUpdateCartItem();
  const { clear, isLoading: isClearing } = useClearCart();

  // Derived state
const totalQuantity = useMemo(
  () =>
    cart.items?.length
      ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0,
  [cart.items]
);

const totalPrice = useMemo(
  () =>
    cart.items?.length
      ? cart.items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        )
      : 0,
  [cart.items]
);


  // Wrappers for mutation functions
  const addToCart = (productId, quantity) => {
    addItem({ productId, quantity });
  };

  const removeFromCart = (productId) => {
    deleteItem(productId);
  };

  const updateCartQuantity = (itemId, quantity) => {
    updateItem({ itemId, quantity });
  };

  const clearCart = () => {
    clear();
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
    isLoading,
    isAdding,
    isDeleting,
    isUpdating,
    isClearing,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCartContext must be used within a CartProvider");
  return context;
}
