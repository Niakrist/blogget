import { useEffect, useState } from "react";

export const useCommentsData = (commentData) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setPost();
    setComments([]);
    if (commentData.length) {
      const { data } = commentData[0];
      for (const item of commentData[1].data.children) {
        if (item.data.id && item.data.author && item.data.created) {
          setComments((prevState) => [
            ...prevState,
            {
              idComment: item.data.id,
              authorComment: item.data.author,
              textComment: item.data.body,
              createdComment: item.data.created,
              upsComment: item.data.ups,
            },
          ]);
        }
      }
      setPost({
        id: data.children[0].data.id,
        title: data.children[0].data.title,
        author: data.children[0].data.author,
        markdown: data.children[0].data.selftext,
      });
    }
  }, [commentData]);
  return [post, comments];
};
