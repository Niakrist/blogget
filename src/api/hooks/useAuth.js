import { useEffect, useState } from "react";
import { URL_API } from "../const";

export const useAuth = (token) => {
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
        localStorage.removeItem("bearer");
        setAuth({});
      }
    };
    fetchToken();
  }, [token]);
  return [auth];
};
