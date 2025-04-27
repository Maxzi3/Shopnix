// useLocalStorage.js
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null && item !== "undefined"
        ? JSON.parse(item)
        : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setValue(
          item !== null && item !== "undefined"
            ? JSON.parse(item)
            : initialValue
        );
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    try {
      if (newValue === null || newValue === undefined) {
        window.localStorage.removeItem(key);
        setValue(initialValue);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [value, setStoredValue];
}

export const getGuestCart = () => {
  try {
    const cart = localStorage.getItem("guestCart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveGuestCart = (cartItems) => {
  try {
    localStorage.setItem("guestCart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving guest cart:", error);
  }
};

export function clearGuestCart() {
  try {
    localStorage.removeItem("guestCart");
  } catch (error) {
    console.error("Error clearing guest cart:", error);
  }
}
