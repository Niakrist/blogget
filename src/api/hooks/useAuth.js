import { useContext, useEffect, useState } from "react";
import { URL_API } from "../const";
import { TokenContext } from "../../context/delete_tokenContext";

export const useAuth = () => {
  const { token, delToken } = useContext(TokenContext);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    if (!token) return;
    const fetchToken = async () => {
      try {
        const response = await fetch(`${URL_API}/api/v1/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (response.status === 401) {
          throw new Error("Вы не авторизированны, токен удален");
        }
        const { name, icon_img: iconImg } = await response.json();
        const img = iconImg?.replace(/\?.*?/, "");
        setAuth({ name, img });
      } catch (error) {
        console.log("Отлов ошибки! ", error);
        setAuth({});
        delToken();
      }
    };
    fetchToken();
  }, [token, delToken]);

  const clearAuth = () => {
    setAuth();
  };

  return [auth, clearAuth];
};
