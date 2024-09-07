import { createContext } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../api/hooks/useAuth";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, clearAuth] = useAuth();

  return (
    <AuthContext.Provider value={{ auth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
