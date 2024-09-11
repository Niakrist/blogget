import { useEffect } from "react";
import { useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Text } from "../../../ui/Text";
import style from "./FormComment.module.css";

export const FormComment = () => {
  const [isFormComment, setIsFormComment] = useState(false);
  const { auth } = useContext(AuthContext);
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
    console.log(`refTextarea: ${refTextarea.current.value}`);
    refTextarea.current.value = "";
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          !isFormComment ? style.btnSendComment : style.btnDontSendComment
        }>
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
          <textarea ref={refTextarea} className={style.textarea}></textarea>
          <button onClick={handleSubmit} className={style.btn}>
            Отправить
          </button>
        </form>
      )}
    </>
  );
};
