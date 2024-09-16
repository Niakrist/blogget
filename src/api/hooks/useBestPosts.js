import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL_API } from "../const";
import axios from "axios";
import { postsRequestAsync } from "../../store/posts/postsAction";
// import { useToken } from "../token";

export const useBestPosts = () => {
  const { token } = useSelector((state) => state.token);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // const [bestPosts, setBestPosts] = useState([]);
  // const [token] = useToken();

  useEffect(() => {
    dispatch(postsRequestAsync());
    // const fetchBestPosts = async () => {
    //   try {
    //     const response = await fetch(`${URL_API}/best`, {
    //       headers: {
    //         Authorization: `bearer ${token}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error("Ошибка при получении Best Posts");
    //     }
    //     const { data } = await response.json();
    //     setBestPosts(data.children);
    //   } catch (error) {
    //     console.log(`Ошибка при получении Best Posts: ${error}`);
    //   }
    // if (!token) return;
    // const fetchBestPosts = async () => {
    //   const response = await axios.get(`${URL_API}/best`, {
    //     headers: {
    //       Authorization: `bearer ${token}`,
    //     },
    //   });
    // if (!response.ok) {
    //   throw new Error(
    //     `Не удалось получиьт посты! Ошибка: ${response.status}`
    //   );
    // }
    //   const { data } = response.data;
    //   setBestPosts(data.children);
    // };

    // if (token) {
    //   fetchBestPosts();
    // }
    // };
  }, [token]);

  // const bestPostsData = [];
  // if (bestPosts) {
  //   for (const item of bestPosts) {
  //     bestPostsData.push({
  //       id: item.data.id,
  //       author: item.data.author,
  //       // created: item.data.created,
  //       createdUtc: item.data.created_utc,
  //       // postHint: item.data.post_hint,
  //       // score: item.data.score,
  //       ups: item.data.ups,
  //       markdown: item.data.selftext,
  //       title: item.data.title,
  //       thumbnail: item.data.thumbnail,
  //     });
  //   }
  // }

  // console.log("bestPostsData: ", bestPostsData);

  return posts;
};
