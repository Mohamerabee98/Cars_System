import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "autoshow_bookings";

export function CartProvider({ children }) {
  // Initialise from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist every change to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /** Add a car to bookings — ignore duplicates */
  const addToCart = (car) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === car.id)) return prev;
      return [...prev, car];
    });
  };

  /** Remove a car from bookings by id */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /** Clear entire bookings + storage */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /** Check if a car is already booked */
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
