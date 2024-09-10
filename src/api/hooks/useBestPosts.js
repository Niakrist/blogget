import { useEffect, useState } from "react";
import { URL_API } from "../const";
import { useToken } from "./useToken";

export const useBestPosts = () => {
  const [bestPosts, setBestPosts] = useState([]);
  const [token] = useToken();

  useEffect(() => {
    try {
      const fetchBestPosts = async () => {
        const response = await fetch(`${URL_API}/best`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка при получении Best Posts");
        }

        const { data } = await response.json();
        setBestPosts(data.children);
      };

      if (token) {
        fetchBestPosts();
      }
    } catch (error) {
      console.log(`Ошибка при получении Best Posts: ${error}`);
    }
  }, [token]);

  console.log("bestPosts: ", bestPosts);

  const bestPostsData = [];
  if (bestPosts) {
    for (const item of bestPosts) {
      bestPostsData.push({
        id: item.data.id,
        author: item.data.author,
        // created: item.data.created,
        createdUtc: item.data.created_utc,
        // postHint: item.data.post_hint,
        // score: item.data.score,
        ups: item.data.ups,
        markdown: item.data.selftext,
        title: item.data.title,
        thumbnail: item.data.thumbnail,
      });
    }
  }

  return bestPostsData;
};
