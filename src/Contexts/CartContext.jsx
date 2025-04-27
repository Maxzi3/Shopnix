// CartContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useCart } from "../features/Cart/useCart";
import { useAddToCart } from "../features/Cart/useAddToCart";
import { useUpdateCartItem } from "../features/Cart/useUpdateCartItem";
import { useDeleteCartItem } from "../features/Cart/useDeleteCartItem";
import { useClearCart } from "../features/Cart/useClearCart";
import {
  getGuestCart,
  saveGuestCart,
  clearGuestCart,
} from "../Hooks/useLocalStorage";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [guestCartItems, setGuestCartItems] = useState(() => getGuestCart());

  const { data: cartData, isLoading, refetch } = useCart();

  useEffect(() => {
    if (token) {
      refetch();
      setGuestCartItems([]); // Clear guest cart UI after login
    }
  }, [token, refetch]);

  const cart = useMemo(() => {
    if (token && cartData) return cartData; // Use DB cart if logged in
    return { items: guestCartItems };
  }, [token, cartData, guestCartItems]);

  const { addItem, isLoading: isAdding } = useAddToCart();
  const { deleteItem, isLoading: isDeleting } = useDeleteCartItem();
  const { updateItem, isLoading: isUpdating } = useUpdateCartItem();
  const { clear, isLoading: isClearing } = useClearCart();

  const addToCart = (product, quantity) => {
    if (token) {
      addItem({ productId: product._id, quantity });
    } else {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        guestCart.push({
          _id: product._id,
          product,
          quantity,
        });
      }

      saveGuestCart(guestCart);
      setGuestCartItems(guestCart);
      toast.success("Item added to guest cart!");
    }
  };

  const removeFromCart = (productId) => {
    if (token) {
      deleteItem(productId);
    } else {
      const guestCart = getGuestCart().filter(
        (item) => item.product._id !== productId
      );
      saveGuestCart(guestCart);
      setGuestCartItems(guestCart);
      toast.success("Item removed from guest cart!");
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    if (token) {
      updateItem({ itemId: productId, quantity });
    } else {
      const guestCart = getGuestCart();
      const item = guestCart.find((item) => item._id === productId);
      if (item) {
        item.quantity = quantity;
        saveGuestCart(guestCart);
        setGuestCartItems(guestCart);
        toast.success("Guest cart item updated!");
      }
    }
  };

  const clearCart = () => {
    if (token) {
      clear();
    } else {
      clearGuestCart();
      setGuestCartItems([]);
      toast.success("Guest cart cleared!");
    }
  };

  const totalQuantity = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart.items]);

  const totalPrice = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (acc, item) => acc + item.quantity * (item.product?.price || 0),
      0
    );
  }, [cart.items]);

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
