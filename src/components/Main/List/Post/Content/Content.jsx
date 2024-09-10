import { useState } from "react";
import { Text } from "../../../../../ui/Text";
import style from "./Content.module.css";
import { Modal } from "../../../../Modal/Modal";
import PropTypes from "prop-types";

export const Content = ({ title, author, markdown }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Text
          As="a"
          size={18}
          tsize={24}
          className={style.linkPost}
          href="#post"
          onClick={() => setIsModalOpen(true)}
        >
          {title}
        </Text>
      </Text>
      <Text
        As="a"
        size={12}
        tsize={14}
        color={"orange"}
        className={style.linkAuthor}
        href="#author"
      >
        {author}
      </Text>
      {isModalOpen && <Modal {...{ title, author, markdown, closeModal }} />}
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};
