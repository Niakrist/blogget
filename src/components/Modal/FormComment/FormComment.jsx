import { useEffect, useRef, useState } from "react";
import { Text } from "../../../ui/Text";
import style from "./FormComment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateComment } from "../../../store/commentReducer.js";
import { useAuth } from "../../../api/hooks/useAuth.js";

export const FormComment = () => {
  const [isFormComment, setIsFormComment] = useState(false);

  const [auth] = useAuth();

  const dispacth = useDispatch();

  const { comment } = useSelector((state) => state.comment);
  const refTextarea = useRef();

  const handleClick = () => {
    setIsFormComment(!isFormComment);
  };

  useEffect(() => {
    if (isFormComment) {
      refTextarea.current.focus();
    }
  }, [isFormComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    dispacth(actionUpdateComment(e.target.value));
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          !isFormComment ? style.btnSendComment : style.btnDontSendComment
        }
      >
        {!isFormComment
          ? "Написать комментарий"
          : "Не хочу оставлять комментарий"}
      </button>
      {isFormComment && (
        <form className={style.form}>
          <Text As="h3" size={14} tsize={18}>
            Имя авторизованного пользователя:{" "}
            <span className={style.auth}>{auth.name}</span>
          </Text>
          <textarea
            value={comment}
            onChange={handleChange}
            ref={refTextarea}
            className={style.textarea}
          ></textarea>
          <button onClick={handleSubmit} className={style.btn}>
            Отправить
          </button>
        </form>
      )}
    </>
  );
};
