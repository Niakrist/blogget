import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URL_API } from "../const";

export const useCommentsData = (id) => {
  const [commentsData, setCommentsData] = useState();
  // const [token] = useToken();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchCommentsData = async (id) => {
      try {
        const response = await fetch(`${URL_API}/comments/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Не удалось получить commentsData! Ошибка: ${response.status}`
          );
        }

        const data = await response.json();
        setCommentsData(data);
      } catch (error) {
        console.log(`Не удалось получить commentsData! Ошибка: ${error}`);
      }
    };
    if (token) {
      fetchCommentsData(id);
    }
  }, [token]);

  return commentsData;
};
