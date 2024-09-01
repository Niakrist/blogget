import { useState } from "react";
import style from "./List.module.css";
import Post from "./Post";

const initData = [
  {
    thumbnail: "",
    title: "React 19 RC Upgrade Guide",
    author: "Ricky Hanlon",
    ups: 24,
    date: "2024-04-25T09:45:00.00Z",
  },
  {
    thumbnail: "",
    title: "React Labs: What We've Been Working On – February 2024",
    author: "Joseph Savona",
    ups: 30,
    date: "2024-02-15T09:45:00.00Z",
  },
  {
    thumbnail: "",
    title: "React Canaries: Enabling Incremental Feature Rollout Outside Meta",
    author: " Dan Abramov",
    ups: 36,
    date: "2023-05-03T09:45:00.00Z",
  },
  {
    thumbnail: "",
    title: "Introducing react.dev",
    author: " Dan Abramov",
    ups: 73,
    date: "2023-05-16T09:45:00.00Z",
  },
];

export const List = () => {
  const [postData, setPostData] = useState(initData);
  const handleDelete = (date) => {
    setPostData(postData.filter((data) => data.date !== date));
  };
  return (
    <ul className={style.list}>
      {postData.map((post) => (
        <Post key={post.date} post={post} onDelete={handleDelete} />
      ))}
    </ul>
  );
};
