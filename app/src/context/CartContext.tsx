import React, { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

const initialState: any =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart-product") as string)
    : null;

export const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<any>(initialState || []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
