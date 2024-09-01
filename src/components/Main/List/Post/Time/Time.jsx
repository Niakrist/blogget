import style from "./Time.module.css";
import { formatDate } from "../../../../../utils/formatDate";
import PropTypes from "prop-types";

export const Time = ({ date }) => {
  return (
    <time className={style.date} dateTime={date}>
      {formatDate(date)}
    </time>
  );
};

Time.propTypes = {
  date: PropTypes.string.isRequired,
};
