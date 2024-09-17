import style from "./List.module.css";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../../../store/posts/postsAction";

export const List = () => {
  const dispatch = useDispatch();

  const { data: posts, isLoading } = useSelector((state) => state.posts);

  const handleDelete = (id) => {
    dispatch(postDelete(id));
  };

  if (!posts) return <div>Loading...</div>;

  return (
    <ul className={style.list}>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      ))}
    </ul>
  );
};
