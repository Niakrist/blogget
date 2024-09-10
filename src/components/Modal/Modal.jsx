import style from "./Modal.module.css";
import { ReactComponent as CloseSrc } from "./img/close.svg";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

export const Modal = ({ title, author, markdown, closeModal }) => {
  const overlayRef = useRef();

  const handleClick = ({ target }) => {
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>{title}</h2>
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
            {markdown}
          </Markdown>
        </div>
        <p className={style.author}>{author}</p>
        <button className={style.close}>
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
};
