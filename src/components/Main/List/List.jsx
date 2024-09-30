import style from "./List.module.css";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import {
  postDelete,
  postsRequestAsync,
} from "../../../store/posts/postsAction";
import { Preloader } from "../../../ui/Preloader";
import Tooltip from "../../Tooltip/Tooltip";
import { useEffect, useRef } from "react";

export const List = () => {
  const refEndList = useRef(null);

  const dispatch = useDispatch();

  const { data: posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(refEndList.current);
          dispatch(postsRequestAsync());
        }
      },
      {
        rootMargin: "100px",
      }
    );
    observer.observe(refEndList.current);
  }, [refEndList.current]);

  const handleDelete = (id) => {
    dispatch(postDelete(id));
  };

  // if (isLoading) {
  //   return <Preloader size={"300px"} />;
  // } else

  if (error) {
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
        <li ref={refEndList} className={style.end} />
      </ul>
    );
  }
};
