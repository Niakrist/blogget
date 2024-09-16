import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { PostsContext } from "../../../context/postsContext";
import style from "./List.module.css";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../../../store/posts/postsAction";

export const List = () => {
  const dispatch = useDispatch();
  // const { posts } = useContext(PostsContext);

  // console.log("posts: ", posts);

  // const [postsData, setPostData] = useState();

  // useEffect(() => {
  //   setPostData(posts);
  // }, [posts]);

  const posts = useSelector((state) => state.posts.data);

  console.log("posts: ", posts);

  const handleDelete = (id) => {
    dispatch(postDelete(id));
  };

  if (!posts) return <div>Loading...</div>;

  return (
    <ul className={style.list}>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </ul>
  );
};
