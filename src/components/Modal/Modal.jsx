import style from "./Modal.module.css";
import { ReactComponent as CloseSrc } from "./img/close.svg";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import FormComment from "./FormComment";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { postItemRequestAsunc } from "../../store/postItem/postItemAction";

export const Modal = ({ closeModal, id }) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  // const commentsData = useCommentsData(id);
  const overlayRef = useRef();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const commentsData = useSelector((state) => state.postItem.data);
  useEffect(() => {
    dispatch(postItemRequestAsunc(id));
  }, [token]);

  useEffect(() => {
    if (commentsData.length) {
      const { data } = commentsData[0];
      for (const item of commentsData[1].data.children) {
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
  }, [commentsData]);

  const handleClick = ({ target }) => {
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleKeydown = ({ keyCode }) => {
    if (keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>{post ? post.title : "Загрузка..."}</h2>
        {post && (
          <>
            {post.markdown ? (
              <div className={style.content}>
                <Markdown
                  options={{
                    overrides: {
                      a: {
                        props: {
                          target: "_blank",
                        },
                      },
                    },
                  }}
                >
                  {post.markdown}
                </Markdown>
              </div>
            ) : (
              <div className={style.noText}>В этой записи текста нет!</div>
            )}
            <p className={style.author}>Автор поста: {post.author}</p>
            <FormComment />
            {comments.length > 0 ? (
              <Comments comments={comments} />
            ) : (
              <div>Комментариев нет!</div>
            )}
          </>
        )}

        <button className={style.close} onClick={closeModal}>
          <CloseSrc />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
  comments: PropTypes.array,
};
