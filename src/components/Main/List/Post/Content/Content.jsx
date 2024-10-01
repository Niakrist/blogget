import { Text } from "../../../../../ui/Text";
import style from "./Content.module.css";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

export const Content = ({ title, author, id }) => {
  const { page } = useParams();
  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Link className={style.linkPost} to={`/category/${page}/post/${id}`}>
          <Text As="span" size={18} tsize={24}>
            {title}
          </Text>
        </Link>
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
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};
