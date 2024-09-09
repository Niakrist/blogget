import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    if (window.location.pathname.includes("/auth")) {
      const token = new URLSearchParams(window.location.hash.substring(1)).get(
        "access_token"
      );
      setToken(token);
    }
    if (localStorage.getItem("bearer")) {
      setToken(localStorage.getItem("bearer"));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("bearer", token);
    }
  }, [token]);

  const delToken = () => {
    if (localStorage.getItem("bearer")) {
      localStorage.removeItem("bearer");
    }
  };

  return [token, delToken];
};
