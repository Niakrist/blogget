import style from "./ButtonDelete.module.css";
import deleteSrc from "../img/delete.svg";
import PropTypes from "prop-types";

export const ButtonDelete = ({ onDelete, id }) => {
  return (
    <button onClick={() => onDelete(id)} className={style.delete}>
      <img src={deleteSrc} alt="Кнопка удалить" />
    </button>
  );
};

ButtonDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
