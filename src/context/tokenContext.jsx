import { createContext } from "react";
import { useToken } from "../api/hooks/useToken";
import PropTypes from "prop-types";

export const TokenContext = createContext("");

export const TokenContextProvider = ({ children }) => {
  const [token, delToken] = useToken();
  return (
    <TokenContext.Provider value={{ token, delToken }}>
      {children}
    </TokenContext.Provider>
  );
};
TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
