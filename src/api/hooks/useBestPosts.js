import { useContext, useEffect, useState } from "react";
import {
  CLIENT_ID,
  RANDOM_STRING,
  RESPONSE_TYPE,
  SCOPE_STRING,
  URL_API,
} from "../const";
import { TokenContext } from "../../context/tokenContext";

export const useBestPosts = () => {
  const [bestPosts, setBestPosts] = useState([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    try {
      const fetchBestPosts = async () => {
        // const url = new URL(URL_API);
        // url.searchParams.append("client_id", CLIENT_ID);
        // url.searchParams.append("response_type", RESPONSE_TYPE);
        // url.searchParams.append("state", RANDOM_STRING);
        // url.searchParams.append("scope", SCOPE_STRING);

        const response = await fetch(`${URL_API}/api/v1/best`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        console.log("response: ", response);
        const data = await response.json();
        setBestPosts(data);
      };
      fetchBestPosts();
      console.log("bestPosts: ", bestPosts);
    } catch (error) {
      console.log(`Ошибка при получении Best Posts: ${error}`);
    }
  }, []);
  return bestPosts;
};
