import style from "./ButtonDelete.module.css";
import deleteSrc from "../img/delete.svg";
import PropTypes from "prop-types";

export const ButtonDelete = ({ onDelete, date }) => {
  return (
    <button onClick={() => onDelete(date)} className={style.delete}>
      <img src={deleteSrc} alt="Кнопка удалить" />
    </button>
  );
};

ButtonDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};
