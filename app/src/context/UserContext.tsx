import React, { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
