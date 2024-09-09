import { createContext } from "react";
import { useBestPosts } from "../api/hooks/useBestPosts";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const posts = useBestPosts();

  return (
    <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>
  );
};
