import style from "./Post.module.css";
import PropTypes from "prop-types";
import notPhotoSrc from "./img/notphoto.jpg";
import Rating from "./Rating";
import Time from "./Time";
import ButtonDelete from "./ButtonDelete";
import Content from "./Content";

export const Post = ({ post, onDelete }) => {
  const { id, title, author, ups, markdown, thumbnail, createdUtc } = post;

  return (
    <li className={style.post}>
      <img className={style.img} src={thumbnail || notPhotoSrc} alt={title} />
      <Content title={title} author={author} markdown={markdown} />
      <Rating ups={ups} />
      <Time date={createdUtc} />
      <ButtonDelete id={id} onDelete={onDelete} />
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  onDelete: PropTypes.func,
};
