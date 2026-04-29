import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  /** Add a car to cart — ignore duplicates */
  const addToCart = (car) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === car.id)) return prev;
      return [...prev, car];
    });
  };

  /** Remove a car from cart by id */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /** Clear entire cart */
  const clearCart = () => setCartItems([]);

  /** Check if a car is already in the cart */
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
