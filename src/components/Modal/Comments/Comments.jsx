import { Text } from "../../../ui/Text/Text";
import style from "./Comments.module.css";
import Time from "../../Main/List/Post/Time";
import { useState } from "react";

export const Comments = ({ comments }) => {
  const [page, setPage] = useState(1);

  const limit = 3;
  const pages = Math.ceil(comments.length / limit);

  const pagination = [];
  for (let i = 0; i < pages; i++) {
    pagination.push(i + 1);
  }

  const getCropComments = (limit, page, comments) => {
    const currentPage = (page - 1) * limit;
    return [...comments].splice(currentPage, limit);
  };
  const cropComments = getCropComments(limit, page, comments);

  return (
    <>
      <ul className={style.list}>
        {cropComments.map((comment) => (
          <li key={comment.idComment} className={style.item}>
            <Text As="h3" className={style.author} size={18} tsize={22}>
              {comment.authorComment}
            </Text>

            <Text As="p" className={style.comment} size={14} tsize={18}>
              {comment.textComment}
            </Text>

            <Time date={comment.createdComment} />
          </li>
        ))}
      </ul>
      {pagination.map((item) => (
        <button
          onClick={() => setPage(item)}
          className={item === page ? style.paginationActive : style.pagination}
          key={item}>
          {item}
        </button>
      ))}
    </>
  );
};
