import style from "./List.module.css";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../../../store/posts/postsAction";
import { Preloader } from "../../../ui/Preloader";
import Tooltip from "../../Tooltip/Tooltip";

export const List = () => {
  const dispatch = useDispatch();

  const { data: posts, isLoading, error } = useSelector((state) => state.posts);

  const handleDelete = (id) => {
    dispatch(postDelete(id));
  };

  if (isLoading) {
    return <Preloader size={"300px"} />;
  } else if (error) {
    return (
      <Tooltip
        error={error.message}
        subject="Не удалось получить список постов"
        bottom="200px"
      />
    );
  } else {
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
  }
};
