import React, { createContext, useState } from "react";

export const CartContextModal = createContext<any>(false);

export const CartContextModalProvider: React.FC = ({ children }) => {
  const [isShowModalCart, setIsShowModalCart] = useState<boolean>(false);

  return (
    <CartContextModal.Provider value={{ isShowModalCart, setIsShowModalCart }}>
      {children}
    </CartContextModal.Provider>
  );
};
