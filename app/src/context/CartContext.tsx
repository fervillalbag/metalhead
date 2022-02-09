import React, { createContext, useState } from "react";

export const CartContext = createContext<any>([]);

export const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<any>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
