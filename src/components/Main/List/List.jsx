import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { PostsContext } from "../../../context/postsContext";
import style from "./List.module.css";
import Post from "./Post";

export const List = () => {
  const { posts } = useContext(PostsContext);

  const [postsData, setPostData] = useState();

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  const handleDelete = (date) => {
    setPostData(postsData.filter((postData) => postData.id !== date));
  };

  if (!postsData) return <div>Loading...</div>;

  return (
    <ul className={style.list}>
      {postsData.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </ul>
  );
};
