import style from "./Modal.module.css";
import { ReactComponent as CloseSrc } from "./img/close.svg";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import FormComment from "./FormComment";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { postItemRequestAsunc } from "../../store/postItem/postItemAction";
import { Preloader } from "../../ui/Preloader";
import Tooltip from "../Tooltip/Tooltip";
import { useParams, useNavigate } from "react-router-dom";
import { commentsSliceAsync } from "../../store/comment/commentSlice";

export const Modal = () => {
  const overlayRef = useRef();

  const { id, page } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const { isLoading, error } = useSelector((state) => state.comments);
  const [post, comments] = useSelector((state) => state.comments.data);

  useEffect(() => {
    // dispatch(postItemRequestAsunc(id));
    dispatch(commentsSliceAsync(id));
  }, [token]);

  const closeModal = () => {
    navigate(`/category/${page}`);
  };

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
        {isLoading ? (
          <Preloader size="100px" />
        ) : error ? (
          <Tooltip
            error={error.message}
            subject={"Не удалось загрузить пост"}
            bottom="400px"
          />
        ) : (
          <>
            <h2 className={style.title}>{post.title}</h2>
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
          </>
        )}
        <button className={style.close} onClick={() => closeModal()}>
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
