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
import { useUpdateCartSize } from "../features/Cart/useUpdateCartSize";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuthStatus();
  const [guestCartItems, setGuestCartItems] = useState(() => getGuestCart());

  const { data: cartData, isLoading } = useCart();

  useEffect(() => {
    if (isAuthenticated && cartData) {
      setGuestCartItems([]); // Clear guest cart UI after login
      clearGuestCart();
    }
  }, [isAuthenticated, cartData]);

  const cart = useMemo(() => {
    if (isAuthenticated && cartData) return cartData; // Use DB cart if logged in
    return { items: guestCartItems };
  }, [isAuthenticated, cartData, guestCartItems]);

  const { addItem, isLoading: isAdding } = useAddToCart();
  const { deleteItem, isLoading: isDeleting } = useDeleteCartItem();
  const { updateItem, isLoading: isUpdating } = useUpdateCartItem();
  const { updateSize, isLoading: isUpdatingSize } = useUpdateCartSize();
  const { clear, isLoading: isClearing } = useClearCart();
  const isGuest = !isAuthenticated;

  const addToCart = (product, quantity) => {
    if (isGuest) {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(`${product.name} quantity updated!`);
      } else {
        guestCart.push({
          _id: product._id,
          product,
          quantity,
        });
        toast.success(`${product.name} added to cart!`);
      }

      saveGuestCart(guestCart);
      setGuestCartItems(guestCart);
    } else {
      addItem({ productId: product._id, quantity, productName: product.name });
    }
  };

  const removeFromCart = (productId) => {
    if (isGuest) {
      const guestCart = getGuestCart().filter(
        (item) => item.product._id !== productId
      );
      saveGuestCart(guestCart);
      setGuestCartItems(guestCart);
      toast.success("Item removed from cart!");
    } else {
      deleteItem(productId);
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    if (isGuest) {
      let guestCart = getGuestCart();
      const itemIndex = guestCart.findIndex((item) => item._id === productId);

      if (itemIndex !== -1) {
        if (quantity === 0) {
          guestCart.splice(itemIndex, 1);
          toast.success("Item removed from cart!");
        } else {
          guestCart[itemIndex].quantity = quantity;
          toast.success("Cart item updated!");
        }

        saveGuestCart(guestCart);
        setGuestCartItems(guestCart);
      }
    } else {
      updateItem({ itemId: productId, quantity });
    }
  };

  const updateCartSize = (productId, newSize) => {
    if (isGuest) {
      const guestCart = getGuestCart();
      const itemIndex = guestCart.findIndex((item) => item._id === productId);

      if (itemIndex !== -1) {
        guestCart[itemIndex].size = newSize;
        saveGuestCart(guestCart);
        setGuestCartItems(guestCart);
        toast.success("Item size updated!");
      }
    } else {
      updateSize({ cartItemId: productId, size: newSize });
    }
  };

  const clearCart = () => {
    if (isGuest) {
      clearGuestCart();
      setGuestCartItems([]);
      toast.success("Cart cleared!");
    } else {
      clear();
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
    updateCartSize,
    clearCart,
    totalQuantity,
    totalPrice,
    isLoading,
    isAdding,
    isDeleting,
    isUpdating,
    isClearing,
    isUpdatingSize,
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
