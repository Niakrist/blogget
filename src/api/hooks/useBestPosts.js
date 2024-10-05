// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postsRequestAsync } from "../../store/posts/postsAction";

// export const useBestPosts = () => {
//   const { token } = useSelector((state) => state.token);
//   const { posts } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(postsRequestAsync());
//   }, [token]);
//   return posts;
// };
