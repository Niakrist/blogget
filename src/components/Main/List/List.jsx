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
import { Outlet, useParams } from "react-router-dom";

export const List = () => {
  const refEndList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  const { data: posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
        }
      },
      {
        rootMargin: "100px",
      }
    );
    observer.observe(refEndList.current);

    // return () => {
    //   if (refEndList.current) {
    //     observer.unobserve(refEndList.current);
    //   }
    // };
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
      <>
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
        <Outlet />
      </>
    );
  }
};
