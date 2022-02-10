import React, { createContext, useState } from "react";

export const MenuContext = createContext<any>(false);

export const MenuContextProvider: React.FC = ({ children }) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ isShowMenu, setIsShowMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
