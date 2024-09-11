import { useEffect, useState } from "react";
import { URL_API } from "../const";
import { useToken } from "./useToken";

export const useBestPosts = () => {
  const [bestPosts, setBestPosts] = useState([]);
  const [token] = useToken();

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
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
      } catch (error) {
        console.log(`Ошибка при получении Best Posts: ${error}`);
      }
    };

    if (token) {
      fetchBestPosts();
    }
  }, [token]);

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
