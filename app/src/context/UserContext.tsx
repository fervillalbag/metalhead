import React, { createContext, useState } from "react";

export const UserContext = createContext<any>({});

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
