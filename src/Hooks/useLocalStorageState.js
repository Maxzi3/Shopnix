import { useState, useEffect } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error("Error parsing localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(key); // Removes the key if null
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  }, [value, key]); // Runs only when `value` or `key` changes

  return [value, setValue];
}
