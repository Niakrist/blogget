import { createContext } from "react";
import { useToken } from "../api/hooks/useToken";

export const TokenContext = createContext("");

export const TokenContextProvider = ({ children }) => {
  const [token, delToken] = useToken();
  return (
    <TokenContext.Provider value={{ token, delToken }}>
      {children}
    </TokenContext.Provider>
  );
};
