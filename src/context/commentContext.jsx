import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const [value, setValue] = useState("");
  return (
    <CommentContext.Provider value={{ value, setValue }}>
      {children}
    </CommentContext.Provider>
  );
};

CommentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
