import style from "./Post.module.css";
import PropTypes from "prop-types";
import notPhotoSrc from "./img/notphoto.jpg";
import Rating from "./Rating";
import Time from "./Time";
import ButtonDelete from "./ButtonDelete";

export const Post = ({ post, onDelete }) => {
  const { title, author, ups, date } = post;
  return (
    <li className={style.post}>
      <img className={style.img} src={notPhotoSrc} alt={title} />
      <div className={style.content}>
        <h2 className={style.title}>
          <a className={style.linkPost} href="#post">
            {title}
          </a>
        </h2>
        <a className={style.linkAuthor} href="#author">
          {author}
        </a>
      </div>
      <Rating ups={ups} />
      <Time date={date} />
      <ButtonDelete date={date} onDelete={onDelete} />
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  onDelete: PropTypes.func,
};
