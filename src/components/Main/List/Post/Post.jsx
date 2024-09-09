import style from "./Post.module.css";
import PropTypes from "prop-types";
import notPhotoSrc from "./img/notphoto.jpg";
import Rating from "./Rating";
import Time from "./Time";
import ButtonDelete from "./ButtonDelete";
import { Text } from "../../../../ui/Text";

export const Post = ({ post, onDelete }) => {
  const { id, title, author, ups, thumbnail, createdUtc } = post;

  return (
    <li className={style.post}>
      <img className={style.img} src={thumbnail || notPhotoSrc} alt={title} />
      <div className={style.content}>
        <Text As="h2" className={style.title}>
          <Text
            As="a"
            size={18}
            tsize={24}
            className={style.linkPost}
            href="#post">
            {title}
          </Text>
        </Text>
        <Text
          As="a"
          size={12}
          tsize={14}
          color={"orange"}
          className={style.linkAuthor}
          href="#author">
          {author}
        </Text>
      </div>
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
