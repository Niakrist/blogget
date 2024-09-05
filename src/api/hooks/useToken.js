import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    if (location.pathname.includes("/auth")) {
      const token = new URLSearchParams(location.hash.substring(1)).get(
        "access_token"
      );
      setToken(token);
    }
    if (localStorage.getItem("bearer")) {
      setToken(localStorage.getItem("bearer"));
    }
  }, []);

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
